import Link from 'next/link'
import React from 'react'

const Footer = () => {

  return (

<footer className="bg-gray-900 shadow-sm pb-(10px)">
    <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
      <span className="text-sm text-gray-500 sm:text-center dark:text-gray-500">Copyrights © {new Date().getFullYear()}. All Rights Reserved.
    </span>
    <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-300 dark:text-gray-400 sm:mt-0">
        <li>
            <Link href="https://www.linkedin.com/in/neelamsetti-harikrishna-50920b23b/" className="hover:underline me-4 md:me-6">Linkedin</Link>
        </li>
        <li>
            <Link href="https://github.com/Harikrishh123" className="hover:underline me-4 md:me-6">Github</Link>
        </li>
        <li>
            <Link href="https://leetcode.com/u/harikrishnaneelamsetti143/" className="hover:underline me-4 md:me-6">Leetcode</Link>
        </li>

    </ul>
    </div>
</footer>

  )
}

export default Footer
