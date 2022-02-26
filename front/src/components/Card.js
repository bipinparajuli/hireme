import React from 'react'
import { Link } from 'react-router-dom'

export const Card = ({name,description,skills,budget}) => {
  return (
    <div style={{marginBottom:"10%"}} className="max-w-sm rounded overflow-hidden shadow-lg">
    {/* <img className="w-full" src="/img/card-top.jpg" alt="Sunset in the mountains"> */}
    <div className="px-6 py-4">
      <div className="font-bold text-xl mb-2">{name}</div>
      <p className="text-gray-700 text-base">
            {description}
      </p>
      <p className="font-bold text-base">
          Budget: <strong className='text-gray-700 text-base'>{budget}</strong>
      </p>

    </div>
    <div className="px-6 pt-4 pb-2">
      {
        skills.map(skill=>(
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{skill.skill}</span>
        ))

      }
      <button class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center">
          <Link to="/applyjob">Apply Now</Link>
      </button>
    </div>
  </div>
  )
}
