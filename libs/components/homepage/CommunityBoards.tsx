import React, { useState } from 'react';
import Link from 'next/link';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import { Box, Stack, Typography } from '@mui/material';
import CommunityCard from './CommunityCard';
import { BoardArticle } from '../../types/board-article/board-article';
import { GET_BOARD_ARTICLES } from '../../../apollo/user/query';
import { useQuery } from '@apollo/client';
import { T } from '../../types/common';
import { BoardArticleCategory } from '../../enums/board-article.enum';
import Moment from 'react-moment';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';

const CommunityBoards = () => {
	const device = useDeviceDetect();
	const [searchCommunity, setSearchCommunity] = useState({
		page: 1,
		limit: 6,
		sort: 'articleViews',
		direction: 'DESC',
	});
	const [newsArticles, setNewsArticles] = useState<BoardArticle[]>([]);

	/** APOLLO REQUESTS **/
	const {
		loading: getNewsArticlesLoading,
		data: getNewsArticlesData,
		error: getNewsArticlesError,
		refetch: getNewsArticlesRefetch,
	} = useQuery(GET_BOARD_ARTICLES, {
		fetchPolicy: 'network-only',
		variables: { input: {...searchCommunity, limit: 6, search: {articleCategory: BoardArticleCategory.NEWS}} },
		onCompleted: (data: T) => {
			setNewsArticles(data?.getBoardArticles?.list);
		}
	});


	if (device === 'mobile') {
		return <div>AVTOMATIVE BLOG (MOBILE)</div>;
	} else {
		return (
			<Stack className={'automotive-blog-section'}>
				<Stack className={'container'}>
					<Typography className={'section-title'} variant={'h2'}>
						AUTOMOTIVE BLOG HiGHLIGHTS
					</Typography>
					<span className='section-desc'>Stay updated with the latest automotive trends, reviews, and industry insights</span>
					<Stack className={'blog-cards-grid'}>
						{newsArticles.slice(0, 3).map((article, index) => {
							const articleImage = article?.articleImage
								? `${process.env.REACT_APP_API_URL}/${article?.articleImage}`
								: '/img/event.svg';
							return (
								<Box key={article?._id} className={'blog-card'}>
									<div
										className={'card-image'}
										style={{ backgroundImage: `url(${articleImage})` }}
									>
										<div className={'author-info'}>
											<img
												src={article?.memberData?.memberImage ?
													`${process.env.REACT_APP_API_URL}/${article?.memberData?.memberImage}` :
													'/img/defaultUser.svg'
												}
												alt={article?.memberData?.memberNick || 'Author'}
												className={'author-avatar'}
											/>
											<span className={'author-name'}>
												{article?.memberData?.memberNick || 'Unknown Author'}
											</span>
											<span className={'article-date'}>
												<Moment format="DD MMM YYYY">{article?.createdAt}</Moment>
											</span>
										</div>
									</div>
									<div className={'card-content'}>
										<h3 className={'article-title'}>
											{article?.articleTitle}
										</h3>
										<div className={'card-footer'}>
											<div className={'article-stats'}>
												<div className={'stat-item'}>
													<FavoriteIcon className={'icon'} style={{color: "#b75348"}} />
													<span>{article?.articleLikes || 0}</span>
												</div>
												<div className={'stat-item'}>
													<ChatBubbleOutlineIcon className={'icon'} style={{color:'#83d063'}} />
													<span>{article?.articleComments || 0}</span>
												</div>
											</div>
											<Link href={'/community?articleCategory=NEWS'} className={'read-more-link'}>
												Read More
												<span className={'arrow'}>›</span>
											</Link>
										</div>
									</div>
								</Box>
							);
						})}
					</Stack>
				</Stack>
			</Stack>
		);
	}
};

export default CommunityBoards;
