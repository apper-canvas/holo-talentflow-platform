import { useState } from 'react'
import { motion } from 'framer-motion'
import MainFeature from '../components/MainFeature'
import ApperIcon from '../components/ApperIcon'

const Home = () => {
  const [activeModule, setActiveModule] = useState('dashboard')

  const modules = [
    {
      id: 'dashboard',
      name: 'Dashboard',
      icon: 'LayoutDashboard',
      color: 'from-blue-500 to-blue-600'
    },
    {
      id: 'payroll',
      name: 'Payroll',
      icon: 'Calculator',
      color: 'from-green-500 to-green-600'
    },
    {
      id: 'attendance',
      name: 'Attendance',
      icon: 'Clock',
      color: 'from-purple-500 to-purple-600'
    },
    {
      id: 'recruitment',
      name: 'Recruitment',
      icon: 'Users',
      color: 'from-orange-500 to-orange-600'
    }
  ]

  const quickStats = [
    { label: 'Active Employees', value: '247', icon: 'UserCheck', change: '+12' },
    { label: 'Present Today', value: '198', icon: 'Clock', change: '+5' },
    { label: 'Pending Leaves', value: '23', icon: 'Calendar', change: '-3' },
    { label: 'Open Positions', value: '8', icon: 'Briefcase', change: '+2' }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-surface-50 via-white to-primary-50">
      {/* Header */}
      <motion.header 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-white shadow-soft border-b border-surface-200"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-primary to-accent rounded-xl flex items-center justify-center shadow-soft">
                <ApperIcon name="Zap" className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  TalentFlow
                </h1>
                <p className="text-xs sm:text-sm text-surface-600 hidden sm:block">HR Management Platform</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3 sm:space-x-4">
              <button className="p-2 rounded-xl bg-surface-100 hover:bg-surface-200 transition-colors">
                <ApperIcon name="Bell" className="w-5 h-5 text-surface-600" />
              </button>
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-primary to-accent rounded-xl flex items-center justify-center">
                <span className="text-white font-semibold text-sm sm:text-base">HR</span>
              </div>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Navigation */}
      <motion.nav 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="bg-white border-b border-surface-200 sticky top-0 z-40"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-1 sm:space-x-2 overflow-x-auto scrollbar-hide py-3">
            {modules.map((module) => (
              <motion.button
                key={module.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setActiveModule(module.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-xl font-medium transition-all duration-200 whitespace-nowrap ${
                  activeModule === module.id
                    ? 'bg-gradient-to-r ' + module.color + ' text-white shadow-soft'
                    : 'text-surface-600 hover:bg-surface-100'
                }`}
              >
                <ApperIcon name={module.icon} className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="text-sm sm:text-base">{module.name}</span>
              </motion.button>
            ))}
          </div>
        </div>
      </motion.nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {activeModule === 'dashboard' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Quick Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {quickStats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="glass-card rounded-2xl p-4 sm:p-6 hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex items-center justify-between mb-2">
                    <ApperIcon name={stat.icon} className="w-8 h-8 text-primary" />
                    <span className="text-xs font-medium text-green-600 bg-green-100 px-2 py-1 rounded-full">
                      {stat.change}
                    </span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-surface-800 mb-1">{stat.value}</h3>
                  <p className="text-xs sm:text-sm text-surface-600">{stat.label}</p>
                </motion.div>
              ))}
            </div>

            {/* Welcome Message */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-gradient-to-r from-primary to-accent rounded-2xl p-6 sm:p-8 text-white"
            >
              <h2 className="text-xl sm:text-2xl font-bold mb-2">Welcome to TalentFlow</h2>
              <p className="text-sm sm:text-base text-white/90 mb-4">
                Your comprehensive HR management solution designed for Indian IT companies
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="bg-white/20 px-3 py-1 rounded-full text-xs sm:text-sm font-medium">Payroll Management</span>
                <span className="bg-white/20 px-3 py-1 rounded-full text-xs sm:text-sm font-medium">Attendance Tracking</span>
                <span className="bg-white/20 px-3 py-1 rounded-full text-xs sm:text-sm font-medium">Recruitment</span>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* Main Feature Component */}
        {activeModule !== 'dashboard' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            key={activeModule}
          >
            <MainFeature activeModule={activeModule} />
          </motion.div>
        )}
      </main>
    </div>
  )
}

export default Home