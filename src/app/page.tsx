/* eslint-disable @next/next/no-img-element */
'use client'
const axios = require('axios')
import { useEffect, useState } from 'react'
type Article = {
	article_id: string
	title: string
	link: string
	keywords: string
	description: string
	pubDate: string
	image_url: string
	creator: string
}

type FilterData = {
	q: string
	category: string
}

export default function Home() {
	const [data, setData] = useState<Article[]>(require('./data.json').results)

	const [filterData, setFilterData] = useState<FilterData>({
		q: '',
		category: '',
	})

	const [isFilter, setIsFilter] = useState(false)

	useEffect(() => {
		axios
			.get(
				'https://newsdata.io/api/1/news?apikey=pub_439202c9df2895e04b9c4830c6f32a2eb79cb&country=tr&language=tr'
			)
			.then((res: any) => setData(res.data.results))
	}, [])

	const search = () => {
		setFilterData({ ...filterData, q: '' })

		let url =
			'https://newsdata.io/api/1/news?apikey=pub_439202c9df2895e04b9c4830c6f32a2eb79cb&country=tr&language=tr'
		if (filterData.q.length > 0) url += `&q=${filterData.q}`
		if (filterData.category.length > 0)
			url += `&category=${filterData.category}`

		axios.get(url).then((res: any) => setData(res.data.results))
	}

	return (
		<>
			<section className=" bg-stone-900 p-4 rounded-lg m-4 mb-0">
				<div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-8">
					<h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
						İnteraktif Haber Sitesi
					</h1>
					<p className="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 lg:px-48 dark:text-gray-400">
						İnteraktif Haber Sitesine hoş geldiniz. Buradan istediğiniz
						kategoride ve aramaya göre haber bulabilirsiniz. Ayrıca orijinal
						kaynağın linkleri de vardır.
					</p>
				</div>
			</section>
			<section className="p-4 flex gap-2">
				<span>Filtre: </span>
				<label className="inline-flex items-center cursor-pointer ">
					{' '}
					<input
						type="checkbox"
						value=""
						className="sr-only peer"
						onChange={(e: any) => setIsFilter(e => !e)}
					/>
					<div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
				</label>
			</section>

			{isFilter && (
				<div className="p-4 ">
					<form
						className="border border-slate-400 rounded-lg p-4 flex flex-col gap-2"
						action={search}>
						<h1 className="text-3xl font-semibold">Filtre</h1>
						<label htmlFor="category">
							Kategori Seç: {''}
							<select
								id="category"
								value={filterData.category}
								onChange={e =>
									setFilterData({ ...filterData, category: e.target.value })
								}
								className="w-fit p-2 border rounded-lg border-slate-400">
								<option value="business">İş</option>
								<option value="crime">Suç</option>
								<option value="domestic">Yerel</option>
								<option value="education">Eğitim</option>
								<option value="entertainment">Eğlence</option>
								<option value="food">Food</option>
								<option value="health">Sağlık</option>
								<option value="lifestyle">Yaşam Biçimi</option>
								<option value="other">Diğer</option>
								<option value="politics">Politika</option>
								<option value="science">Bilim</option>
								<option value="sports">Spor</option>
								<option value="technology">Teknoloji</option>
								<option value="top">En iyi</option>
								<option value="tourism">Turizm</option>
								<option value="world">Dünya</option>
							</select>
						</label>
						<label htmlFor="text">
							Gelişmiş Arama: {''}
							<input
								type="text"
								value={filterData.q}
								placeholder="Ara..."
								className="p-2 ml-2 border rounded-lg"
								onChange={e =>
									setFilterData({ ...filterData, q: e.target.value })
								}
							/>
						</label>
						<p className="text-xs text-slate-500">
							Gelişmiş arama, özelliştirilmiş akıllı aramalar için kullanılır.
						</p>
						<button
							type="submit"
							className="rounded-lg bg-gray-900 text-white w-fit p-4 ">
							Filtrele
						</button>
					</form>
				</div>
			)}
			<div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-4 p-4">
				{data.map((article: Article) => (
					<div
						key={article.article_id}
						className="rounded-lg bg-gray-300 h-auto">
						{article.image_url && (
							<a href={article.link}>
								<img
									className="bg-center m-auto w-full"
									src={article.image_url}
									alt="news-image"
								/>
							</a>
						)}
						<div className="p-8">
							<h1 className="text-2xl font-bold">
								<a href={article.link}>{article.title}</a>
							</h1>
							<p className="mt-4">{article.description}</p>
							<button className=" bg-gray-800 rounded-lg p-4 text-white mt-4">
								<a href={article.link}></a>
								Kaynağa Git
							</button>
						</div>
					</div>
				))}
			</div>
		</>
	)
}
