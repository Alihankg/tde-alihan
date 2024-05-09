/* eslint-disable @next/next/no-img-element */
'use client'
import { useEffect, useState } from 'react'

const axios = require('axios').default

type Article = {
	author: string
	title: string
	description: string | null
	url: string
	urlToImage: string | null
	publishedAt: string
	content: string | null
}

type Filter = {
	category: string
}

export default function Home() {
	const [data, setData] = useState<Article[]>(require('./data.json'))
	const [category, setCategory] = useState('')
	const [q, setQ] = useState('')

	const search = async () => {
		const res = await fetch(
			`https://newsapi.org/v2/top-headlines?category=${category}&q=${q}&country=tr&apiKey=c2cea7def2584ae29ff501f6a2e61f34`
		)
		const d = await res.json()
		setData(d.articles)
	}

	return (
		<div className="w-full flex items-center gap-4 flex-col bg-black">
			<form
				className="example p-4 flex flex-col gap-4 border rounded-lg w-2/3 "
				action={search}>
				<label htmlFor="category">
					Kategori Seç: {''}
					<select
						id="category"
						className="w-fit p-2 text-black"
						onChange={e => setCategory(e.target.value)}>
						<option value="business">İş</option>
						<option value="entertainment">Eğlence</option>
						<option value="general">Genel</option>
						<option value="health">Sağlık</option>
						<option value="science">Bilim</option>
						<option value="sports">Spor</option>
						<option value="technology">Teknoloji</option>
					</select>
				</label>
				<div>
					<input
						type="text"
						placeholder="Ara.."
						name="search"
						className="p-2 rounded mr-2 text-black"
						onChange={e => setQ(e.target.value)}></input>
					<button type="submit">
						<i className="fa fa-search p-2"></i>
					</button>
				</div>
			</form>
			{data.map((article: Article, id: number) => (
				<div
					key={id}
					className="rounded-lg bg-neutral-300 w-2/3 h-auto text-zinc-900">
					{article.urlToImage && (
						<a href={article.url}>
							<img
								className="bg-center bg-cover m-auto"
								src={article.urlToImage}
								alt="news-image"
							/>
						</a>
					)}
					<div className="p-10 flex flex-col gap-5">
						<h1 className="text-2xl font-bold">
							<a href={article.url}>{article.title}</a>
						</h1>
						<p>{article.description}</p>
						<p>{article.content}</p>
						<button className=" bg-red-500 rounded-lg p-4 text-white">
							Kaynağa Git
						</button>
					</div>
				</div>
			))}
		</div>
	)
}
