import { useMemo } from 'react';
import { ApolloClient, ApolloLink, InMemoryCache, split, from, NormalizedCacheObject } from '@apollo/client';
import createUploadLink from 'apollo-upload-client/public/createUploadLink.js';
import { WebSocketLink } from '@apollo/client/link/ws';
import { getMainDefinition } from '@apollo/client/utilities';
import { onError } from '@apollo/client/link/error';
import { getJwtToken } from '../libs/auth';
import { TokenRefreshLink } from 'apollo-link-token-refresh';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';
import { socketVarOrginal } from './store';
import { sweetErrorAlert } from '../libs/sweetAlert';

let apolloClient: ApolloClient<NormalizedCacheObject>;

function getHeaders() {
	const headers = {} as HeadersInit;
	const token = getJwtToken();
	// @ts-ignore
	if (token) headers['Authorization'] = `Bearer ${token}`;
	return headers;
}

// @ts-ignore
const tokenRefreshLink = new TokenRefreshLink({
	accessTokenField: 'accessToken',
	isTokenValidOrUndefined: () => {
		return true;
	}, // @ts-ignore
	fetchAccessToken: () => {
		// execute refresh token
		return null;
	},
});

// Custom WebSocket client
class LoggingWebSocket {
	private socket: WebSocket;

	constructor(url: string) {
		this.socket = new WebSocket(`${url}?token=${getJwtToken()}`);
		socketVarOrginal(this.socket)

	this.socket.onopen = () => {
		console.log("WebSocket connection");
	};

	this.socket.onmessage = (msg) => {
		console.log("WebSocket message:", msg.data);
	};

	this.socket.onerror = (error) => {
		console.log("WebSocket, error:", error);
	};
	}

	send(
		data: string | ArrayBuffer | SharedArrayBuffer | Blob | ArrayBufferView
	) {
		this.socket.send(data);
	}

	close() {
	this.socket.close();
	}
}

function createIsomorphicLink() {
	if (typeof window !== 'undefined') {
		const authLink = new ApolloLink((operation, forward) => {
			operation.setContext(({ headers = {} }) => ({
				headers: {
					...headers,
					...getHeaders(),
				},
			}));
			console.warn('requesting.. ', operation);
			return forward(operation);
		});

		// @ts-ignore
		const link = new createUploadLink({
			uri: process.env.REACT_APP_API_GRAPHQL_URL,
		});

		/* WEBSOCKET SUBSCRIPTION LINK */
		const wsLink = new WebSocketLink({
			uri: process.env.REACT_APP_API_WS ?? 'ws://127.0.0.1:3002',
			options: {
				reconnect: false,
				timeout: 30000,
				connectionParams: () => {
					return { headers: getHeaders() };
				},
			},
			webSocketImpl: LoggingWebSocket
		});

		const errorLink = onError(({ graphQLErrors, networkError, response }) => {
			if (graphQLErrors) {
				graphQLErrors.map(({ message, locations, path, extensions }) => {
					console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`);
					if (!message.includes("input")) sweetErrorAlert(message);
			});
			}
			if (networkError) console.log(`[Network error]: ${networkError}`);
			// @ts-ignore
			if (networkError?.statusCode === 401) {
			}
		});

		const splitLink = split(
			({ query }) => {
				const definition = getMainDefinition(query);
				return definition.kind === 'OperationDefinition' && definition.operation === 'subscription';
			},
			wsLink,
			authLink.concat(link),
		);

		return from([errorLink, tokenRefreshLink, splitLink]);
	}
}

// function createApolloClient() {
// 	return new ApolloClient({
// 		ssrMode: typeof window === 'undefined',
// 		link: createIsomorphicLink(),
// 		cache: new InMemoryCache(),
// 		resolvers: {},
// 	});
// }


/*    BU YERNI O"ZGARTIRDIM     */

function createApolloClient() {
	return new ApolloClient({
		ssrMode: typeof window === 'undefined',
		link: createIsomorphicLink(),
		cache: new InMemoryCache({
			// Bu qo'shildi - cache policy
			typePolicies: {
				Query: {
					fields: {
						// Barcha fieldlar uchun merge policy
						__typename: {
							merge: false
						}
					}
				}
			}
		}),
		resolvers: {},
		// Bu ham qo'shildi - default options
		defaultOptions: {
			watchQuery: {
				errorPolicy: 'all'
			},
			query: {
				errorPolicy: 'all'
			}
		}
	});
}

export function initializeApollo(initialState = null) {
	const _apolloClient = apolloClient ?? createApolloClient();
	if (initialState) _apolloClient.cache.restore(initialState);
	if (typeof window === 'undefined') return _apolloClient;
	if (!apolloClient) apolloClient = _apolloClient;

	return _apolloClient;
}

export function useApollo(initialState: any) {
	return useMemo(() => initializeApollo(initialState), [initialState]);
}

/**
import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";

// No Subscription required for develop process

const httpLink = createHttpLink({
  uri: "http://localhost:3002/graphql",
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

export default client;
*/

 // const wsLink = new GraphQLWsLink(createClient({
		// 	url: process.env.REACT_APP_API_WS ?? 'ws://127.0.0.1:3002/graphql',
		// 	connectionParams: () => ({
		// 		headers: getHeaders(),
		// 	}),
		// 	retryAttempts: 3,
		// }));