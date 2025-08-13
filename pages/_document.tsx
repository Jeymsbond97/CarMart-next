import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
	return (
		<Html lang="en">
			<Head>
				<meta name="robots" content="index,follow" />
				<link rel="icon" type="image/png" href="/img/logo/111.png" />

				{/* SEO */}
				<meta name="keyword" content={'carmart, carmart.uz, cars, carbuys, carsell, mern nestjs fullstack'} />
				<meta
					name={'description'}
					content={
						'Buy and sell cars anywhere, anytime in South Korea. Best cars at the best prices on carmart.uz | ' +
						'Покупайте и продавайте автомобили в любое время и в любом месте Южной Кореи. Лучшие автомобили по лучшим ценам на carmart.uz | ' +
						'대한민국에서 언제 어디서나 자동차를 사고팔 수 있습니다. 최고의 가격으로 최고의 자동차를 carmart.uz에서 만나보세요'
					}
				/>
			</Head>
			<body>
				<Main />
				<NextScript />
			</body>
		</Html>
	);
}
