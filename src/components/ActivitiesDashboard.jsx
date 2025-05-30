import { useState } from 'react'
import { motion } from 'framer-motion'
import { toast } from 'react-toastify'
import ApperIcon from './ApperIcon'

const ActivitiesDashboard = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterType, setFilterType] = useState('all')
  const [selectedActivity, setSelectedActivity] = useState(null)

  const allActivities = [
    { 
      id: 1, 
      type: 'leave', 
      message: 'Priya Patel submitted sick leave request', 
      time: '2 hours ago', 
      icon: 'Calendar',
      status: 'pending',
      user: 'Priya Patel',
      department: 'Design',
      priority: 'medium'
    },
    { 
      id: 2, 
      type: 'payroll', 
      message: 'Monthly payroll processed for 245 employees', 
      time: '5 hours ago', 
      icon: 'Calculator',
      status: 'completed',
      user: 'System',
      department: 'HR',
      priority: 'high'
    },
    { 
      id: 3, 
      type: 'recruitment', 
      message: 'New candidate Rahul Kumar scheduled for interview', 
      time: '1 day ago', 
      icon: 'Users',
      status: 'scheduled',
      user: 'HR Team',
      department: 'Engineering',
      priority: 'medium'
    },
    { 
      id: 4, 
      type: 'attendance', 
      message: 'Attendance marked for 198 employees today', 
      time: '2 days ago', 
      icon: 'Clock',
      status: 'completed',
      user: 'System',
      department: 'All',
      priority: 'low'
    },
    { 
      id: 5, 
      type: 'leave', 
      message: 'Arjun Sharma vacation leave approved', 
      time: '3 days ago', 
      icon: 'Calendar',
      status: 'approved',
      user: 'Arjun Sharma',
      department: 'Engineering',
      priority: 'low'
    },
    { 
      id: 6, 
      type: 'recruitment', 
      message: 'Interview completed for Frontend Developer position', 
      time: '4 days ago', 
      icon: 'Users',
      status: 'completed',
      user: 'HR Team',
      department: 'Engineering',
      priority: 'medium'
    },
    { 
      id: 7, 
      type: 'payroll', 
      message: 'Bonus payments initiated for Q4 performance', 
      time: '5 days ago', 
      icon: 'Calculator',
      status: 'processing',
      user: 'Finance Team',
      department: 'Finance',
      priority: 'high'
    },
    { 
      id: 8, 
      type: 'attendance', 
      message: 'Weekly attendance report generated', 
      time: '1 week ago', 
      icon: 'Clock',
      status: 'completed',
      user: 'System',
      department: 'All',
      priority: 'low'
    }
  ]

  const activityTypes = [
    { id: 'all', name: 'All Activities', icon: 'Activity' },
    { id: 'leave', name: 'Leave Management', icon: 'Calendar' },
    { id: 'payroll', name: 'Payroll', icon: 'Calculator' },
    { id: 'recruitment', name: 'Recruitment', icon: 'Users' },
    { id: 'attendance', name: 'Attendance', icon: 'Clock' }
  ]

  const filteredActivities = allActivities.filter(activity => {
    const matchesSearch = activity.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         activity.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         activity.department.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = filterType === 'all' || activity.type === filterType
    return matchesSearch && matchesType
  })

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'green'
      case 'pending': return 'yellow'
      case 'approved': return 'blue'
      case 'processing': return 'purple'
      case 'scheduled': return 'indigo'
      default: return 'gray'
    }
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'red'
      case 'medium': return 'yellow'
      case 'low': return 'green'
      default: return 'gray'
    }
  }

  const handleActivityClick = (activity) => {
    setSelectedActivity(activity)
    toast.info(`Viewing details for: ${activity.message}`)
  }

  const handleActionClick = (activity, action) => {
    toast.success(`${action} action performed for activity: ${activity.user}`)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-pink-800 bg-clip-text text-transparent">
            Activities Dashboard
          </h1>
          <p className="text-surface-600 mt-2">Monitor and manage all system activities</p>
        </div>
        
        <div className="flex items-center space-x-3">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => toast.info('Exporting activities report...')}
            className="btn-secondary flex items-center space-x-2"
          >
            <ApperIcon name="Download" className="w-4 h-4" />
            <span>Export</span>
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => toast.success('Activities refreshed')}
            className="btn-primary flex items-center space-x-2"
          >
            <ApperIcon name="RefreshCw" className="w-4 h-4" />
            <span>Refresh</span>
          </motion.button>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="glass-card rounded-2xl p-6">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <ApperIcon name="Search" className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-surface-400" />
            <input
              type="text"
              placeholder="Search activities, users, or departments..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="form-input pl-10"
            />
          </div>

          {/* Activity Type Filter */}
          <div className="flex space-x-2 overflow-x-auto">
            {activityTypes.map((type) => (
              <motion.button
                key={type.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setFilterType(type.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-xl font-medium transition-all whitespace-nowrap ${
                  filterType === type.id
                    ? 'bg-gradient-to-r from-pink-500 to-pink-600 text-white shadow-soft'
                    : 'bg-surface-100 text-surface-600 hover:bg-surface-200'
                }`}
              >
                <ApperIcon name={type.icon} className="w-4 h-4" />
                <span className="text-sm">{type.name}</span>
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      {/* Activities List */}
      <div className="glass-card rounded-2xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-surface-800">
            Recent Activities ({filteredActivities.length})
          </h2>
          <div className="flex items-center space-x-2 text-sm text-surface-600">
            <ApperIcon name="Filter" className="w-4 h-4" />
            <span>Filtered by: {activityTypes.find(t => t.id === filterType)?.name}</span>
          </div>
        </div>

        <div className="space-y-4">
          {filteredActivities.map((activity, index) => (
            <motion.div
              key={activity.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="flex items-center justify-between p-4 rounded-xl hover:bg-surface-50 cursor-pointer transition-all duration-200 border border-surface-200"
              onClick={() => handleActivityClick(activity)}
            >
              <div className="flex items-center space-x-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                  activity.type === 'leave' ? 'bg-yellow-100' :
                  activity.type === 'payroll' ? 'bg-green-100' :
                  activity.type === 'recruitment' ? 'bg-blue-100' :
                  'bg-purple-100'
                }`}>
                  <ApperIcon 
                    name={activity.icon} 
                    className={`w-6 h-6 ${
                      activity.type === 'leave' ? 'text-yellow-600' :
                      activity.type === 'payroll' ? 'text-green-600' :
                      activity.type === 'recruitment' ? 'text-blue-600' :
                      'text-purple-600'
                    }`} 
                  />
                </div>
                
                <div className="flex-1">
                  <p className="font-medium text-surface-800 mb-1">{activity.message}</p>
                  <div className="flex items-center space-x-4 text-sm text-surface-600">
                    <span className="flex items-center space-x-1">
                      <ApperIcon name="User" className="w-3 h-3" />
                      <span>{activity.user}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <ApperIcon name="Building" className="w-3 h-3" />
                      <span>{activity.department}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <ApperIcon name="Clock" className="w-3 h-3" />
                      <span>{activity.time}</span>
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                {/* Priority Badge */}
                <div className={`w-3 h-3 rounded-full bg-${getPriorityColor(activity.priority)}-500`}></div>
                
                {/* Status Badge */}
                <span className={`status-badge status-${getStatusColor(activity.status)} bg-${getStatusColor(activity.status)}-100 text-${getStatusColor(activity.status)}-800`}>
                  {activity.status}
                </span>

                {/* Action Buttons */}
                <div className="flex items-center space-x-2">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={(e) => {
                      e.stopPropagation()
                      handleActionClick(activity, 'View')
                    }}
                    className="p-2 rounded-lg bg-blue-100 text-blue-600 hover:bg-blue-200 transition-colors"
                  >
                    <ApperIcon name="Eye" className="w-4 h-4" />
                  </motion.button>
                  
                  {activity.status === 'pending' && (
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={(e) => {
                        e.stopPropagation()
                        handleActionClick(activity, 'Approve')
                      }}
                      className="p-2 rounded-lg bg-green-100 text-green-600 hover:bg-green-200 transition-colors"
                    >
                      <ApperIcon name="Check" className="w-4 h-4" />
                    </motion.button>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredActivities.length === 0 && (
          <div className="text-center py-12">
            <ApperIcon name="Search" className="w-12 h-12 text-surface-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-surface-600 mb-2">No activities found</h3>
            <p className="text-surface-500">Try adjusting your search terms or filters</p>
          </div>
        )}
      </div>

      {/* Activity Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Total Activities', value: allActivities.length, icon: 'Activity', color: 'pink' },
          { label: 'Pending Actions', value: allActivities.filter(a => a.status === 'pending').length, icon: 'Clock', color: 'yellow' },
          { label: 'Completed Today', value: allActivities.filter(a => a.time.includes('hours')).length, icon: 'CheckCircle', color: 'green' },
          { label: 'High Priority', value: allActivities.filter(a => a.priority === 'high').length, icon: 'AlertTriangle', color: 'red' }
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + index * 0.05 }}
            className="glass-card rounded-2xl p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-surface-600">{stat.label}</p>
                <p className="text-2xl font-bold text-surface-800 mt-1">{stat.value}</p>
              </div>
              <div className={`w-12 h-12 bg-gradient-to-r from-${stat.color}-500 to-${stat.color}-600 rounded-xl flex items-center justify-center`}>
                <ApperIcon name={stat.icon} className="w-6 h-6 text-white" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

export default ActivitiesDashboard