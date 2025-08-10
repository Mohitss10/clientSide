import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { useClerk, UserButton, useUser } from '@clerk/clerk-react'
import { motion } from 'framer-motion'

const Navbar = () => {
  const navigate = useNavigate()
  const { user } = useUser()
  const { openSignIn } = useClerk()

  return (
    <motion.div
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className='fixed z-50 w-full backdrop-blur-2xl flex justify-between items-center py-3 px-4 sm:px-20 xl:px-32 cursor-pointer'
    >
      <div
        className="flex items-center gap-2 cursor-pointer"
        onClick={() => navigate('./Hero')}
      >
        <img
          src={assets.logo}
          alt="logo"
          className="w-7"
        />
        <span className="bg-gradient-to-r from-gray-300 via-gray-400 to-gray-500 bg-clip-text text-transparent text-3xl">
          AIMatrix
        </span>
      </div>

      {user ? (
        <UserButton />
      ) : (
        <button
          onClick={openSignIn}
          className='flex items-center gap-2 rounded-full sm:text-[16px] text-[12px] cursor-pointer bg-primary text-white px-3 sm:px-5 py-2'
        >
          Create Account
          <ArrowRight className='h-4 w-4' />
        </button>
      )}
    </motion.div>
  )
}

export default Navbar
