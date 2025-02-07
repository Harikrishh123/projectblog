import Link from 'next/link'
import React from 'react'



const Blogitem = (props) => {
    const {title , summary, description , username , _id, image, createdAt, updatedAt} = props
    const formattedDate = new Date(updatedAt).toLocaleDateString('en-us', {  day:"numeric", month:"short", year:"numeric"})
  return (
    <div className="flex flex-col overflow-hidden rounded-lg border bg-white">
    <Link href={`/read/${_id}`} className="group relative block h-48 overflow-hidden bg-gray-100 md:h-64">
      <img src= {image} loading="lazy" alt="Photo by Lorenzo Herrera" className="absolute inset-0 h-full w-full object-cover object-center transition duration-200 group-hover:scale-110" />
    </Link>

    <div className="flex flex-1 flex-col p-4 sm:p-6">
      <h2 className="mb-2 text-lg font-semibold text-gray-800">
        <Link href={`/read/${_id}`} className="transition duration-100 hover:text-indigo-500 active:text-indigo-600">{title}</Link>
      </h2>

      <p className="mb-8 text-gray-500">{summary}</p>

      <div className="mt-auto flex items-end justify-between">
        <div className="flex items-center gap-2">
          

          <div>
            <span className="block text-indigo-500">{username}</span>
            <span className="block text-sm text-gray-400">Last Updated : {formattedDate}</span>
          </div>
        </div>

        <Link href={`/read/${_id}`} className="rounded border px-3 py-2 text-sm text-white bg-gray-700">Read More</Link>
      </div>
    </div>
  </div>
  )
}

export default Blogitem
