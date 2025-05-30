import { useState } from 'react'
import { motion } from 'framer-motion'
import MainFeature from '../components/MainFeature'
import ApperIcon from '../components/ApperIcon'
import { toast } from 'react-toastify'
import Chart from 'react-apexcharts'

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
},
{
      id: 'employees',
      name: 'Employee Directory',
      icon: 'UserSearch',
      color: 'from-teal-500 to-teal-600'
    },
    {
      id: 'analytics',
      name: 'Analytics',
      icon: 'BarChart3',
      color: 'from-indigo-500 to-indigo-600'
    }
  ]

  const quickStats = [
    { label: 'Active Employees', value: '247', icon: 'UserCheck', change: '+12' },
    { label: 'Present Today', value: '198', icon: 'Clock', change: '+5' },
    { label: 'Pending Leaves', value: '23', icon: 'Calendar', change: '-3' },
    { label: 'Open Positions', value: '8', icon: 'Briefcase', change: '+2' }
  ]
const [searchTerm, setSearchTerm] = useState('')
  const [selectedEmployee, setSelectedEmployee] = useState(null)

  const enhancedStats = [
    { 
      label: 'Active Employees', 
      value: '247', 
      icon: 'UserCheck', 
      change: '+12', 
      trend: 'up', 
      percentage: '+5.1%',
      description: 'vs last month',
      color: 'blue'
    },
    { 
      label: 'Present Today', 
      value: '198', 
      icon: 'Clock', 
      change: '+5', 
      trend: 'up', 
      percentage: '+2.6%',
      description: 'attendance rate: 80%',
      color: 'green'
    },
    { 
      label: 'Pending Leaves', 
      value: '23', 
      icon: 'Calendar', 
      change: '-3', 
      trend: 'down', 
      percentage: '-11.5%',
      description: 'awaiting approval',
      color: 'yellow'
    },
    { 
      label: 'Open Positions', 
      value: '8', 
      icon: 'Briefcase', 
      change: '+2', 
      trend: 'up', 
      percentage: '+33%',
      description: 'active recruiting',
      color: 'purple'
    }
  ]

  const employeeData = [
    { id: 1, name: 'Arjun Sharma', department: 'Engineering', status: 'present', role: 'Senior Developer', avatar: 'AS' },
    { id: 2, name: 'Priya Patel', department: 'Design', status: 'present', role: 'UI/UX Designer', avatar: 'PP' },
    { id: 3, name: 'Rahul Kumar', department: 'Marketing', status: 'absent', role: 'Marketing Manager', avatar: 'RK' },
    { id: 4, name: 'Sneha Gupta', department: 'HR', status: 'present', role: 'HR Specialist', avatar: 'SG' },
    { id: 5, name: 'Vikram Singh', department: 'Engineering', status: 'on-leave', role: 'DevOps Engineer', avatar: 'VS' },
  ]

  const recentActivities = [
    { id: 1, type: 'leave', message: 'Priya Patel submitted sick leave request', time: '2 hours ago', icon: 'Calendar' },
    { id: 2, type: 'payroll', message: 'Monthly payroll processed for 245 employees', time: '5 hours ago', icon: 'Calculator' },
    { id: 3, type: 'recruitment', message: 'New candidate Rahul Kumar scheduled for interview', time: '1 day ago', icon: 'Users' },
    { id: 4, type: 'attendance', message: 'Attendance marked for 198 employees today', time: '2 days ago', icon: 'Clock' },
  ]

  const performanceMetrics = [
    { label: 'Employee Satisfaction', value: 85, maxValue: 100, color: 'green', change: '+3%' },
    { label: 'Productivity Index', value: 92, maxValue: 100, color: 'blue', change: '+7%' },
    { label: 'Retention Rate', value: 88, maxValue: 100, color: 'purple', change: '+2%' },
    { label: 'Training Completion', value: 76, maxValue: 100, color: 'orange', change: '+12%' },
  ]

  const quickActions = [
    { label: 'Add Employee', icon: 'UserPlus', color: 'blue', action: () => setActiveModule('recruitment') },
    { label: 'Process Payroll', icon: 'Calculator', color: 'green', action: () => setActiveModule('payroll') },
    { label: 'View Analytics', icon: 'BarChart3', color: 'purple', action: () => setActiveModule('analytics') },
    { label: 'Manage Leaves', icon: 'Calendar', color: 'orange', action: () => setActiveModule('attendance') },
  ]

  const chartOptions = {
    chart: { toolbar: { show: false }, sparkline: { enabled: true } },
    colors: ['#2563eb'],
    stroke: { curve: 'smooth', width: 2 },
    fill: { type: 'gradient', gradient: { shadeIntensity: 1, opacityFrom: 0.4, opacityTo: 0.1 } },
    grid: { show: false },
    xaxis: { labels: { show: false }, axisBorder: { show: false }, axisTicks: { show: false } },
    yaxis: { labels: { show: false } },
    tooltip: { enabled: true, theme: 'dark' }
  }

  const attendanceData = [65, 70, 68, 75, 80, 85, 82, 88, 90, 85, 87, 92]
  const payrollData = [45, 52, 48, 61, 55, 67, 69, 72, 78, 75, 79, 83]
  const recruitmentData = [12, 15, 18, 14, 20, 25, 22, 28, 30, 26, 32, 35]

  const filteredEmployees = employeeData.filter(emp => 
    emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    emp.department.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleStatClick = (stat) => {
    toast.info(`${stat.label}: ${stat.description}`)
  }

  const handleEmployeeSelect = (employee) => {
    setSelectedEmployee(employee)
    toast.success(`Selected ${employee.name} - ${employee.role}`)
  }

  const handleQuickAction = (action) => {
    action.action()
    toast.success(`${action.label} initiated`)
  }

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
            {/* Enhanced Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {enhancedStats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="glass-card rounded-2xl p-4 sm:p-6 hover:shadow-lg transition-all duration-300 cursor-pointer group"
                  onClick={() => handleStatClick(stat)}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className={`w-12 h-12 bg-gradient-to-r from-${stat.color}-500 to-${stat.color}-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform`}>
                      <ApperIcon name={stat.icon} className="w-6 h-6 text-white" />
                    </div>
                    <div className={`flex items-center text-xs font-medium ${
                      stat.trend === 'up' ? 'text-green-600 bg-green-100' : 'text-red-600 bg-red-100'
                    } px-2 py-1 rounded-full`}>
                      <ApperIcon 
                        name={stat.trend === 'up' ? 'TrendingUp' : 'TrendingDown'} 
                        className="w-3 h-3 mr-1" 
                      />
                      {stat.percentage}
                    </div>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-surface-800 mb-1">{stat.value}</h3>
                  <p className="text-sm font-medium text-surface-700 mb-1">{stat.label}</p>
                  <p className="text-xs text-surface-500">{stat.description}</p>
                </motion.div>
              ))}
            </div>

            {/* Charts and Analytics */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Attendance Pattern */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="glass-card rounded-2xl p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-surface-800">Attendance Pattern</h3>
                  <ApperIcon name="TrendingUp" className="w-5 h-5 text-green-600" />
                </div>
                <div className="h-24 mb-4">
                  {typeof window !== 'undefined' && (
                    <Chart
                      options={chartOptions}
                      series={[{ name: 'Attendance', data: attendanceData }]}
                      type="area"
                      height={96}
                    />
                  )}
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-surface-600">Last 12 months</span>
                  <span className="font-semibold text-green-600">+12% ↑</span>
                </div>
              </motion.div>

              {/* Department Distribution */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="glass-card rounded-2xl p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-surface-800">Department Split</h3>
                  <ApperIcon name="PieChart" className="w-5 h-5 text-blue-600" />
                </div>
                <div className="space-y-3">
                  {[
                    { name: 'Engineering', percentage: 45, count: 111, color: 'blue' },
                    { name: 'Sales', percentage: 25, count: 62, color: 'green' },
                    { name: 'Marketing', percentage: 15, count: 37, color: 'purple' },
                    { name: 'Others', percentage: 15, count: 37, color: 'orange' }
                  ].map((dept) => (
                    <div key={dept.name} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`w-3 h-3 bg-${dept.color}-500 rounded-full`}></div>
                        <span className="text-sm font-medium text-surface-700">{dept.name}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-surface-600">{dept.count}</span>
                        <span className="text-xs text-surface-500">({dept.percentage}%)</span>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Quick Actions */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="glass-card rounded-2xl p-6"
              >
                <h3 className="text-lg font-semibold text-surface-800 mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  {quickActions.map((action, index) => (
                    <motion.button
                      key={action.label}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleQuickAction(action)}
                      className={`w-full flex items-center space-x-3 p-3 rounded-xl bg-gradient-to-r from-${action.color}-50 to-${action.color}-100 hover:from-${action.color}-100 hover:to-${action.color}-200 transition-all duration-200`}
                    >
                      <div className={`w-8 h-8 bg-gradient-to-r from-${action.color}-500 to-${action.color}-600 rounded-lg flex items-center justify-center`}>
                        <ApperIcon name={action.icon} className="w-4 h-4 text-white" />
                      </div>
                      <span className={`font-medium text-${action.color}-700`}>{action.label}</span>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Performance Metrics */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="glass-card rounded-2xl p-6"
            >
              <h3 className="text-lg font-semibold text-surface-800 mb-6">Performance Metrics</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {performanceMetrics.map((metric, index) => (
                  <div key={metric.label} className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-surface-700">{metric.label}</span>
                      <span className={`text-xs font-medium text-${metric.color}-600`}>{metric.change}</span>
                    </div>
                    <div className="relative">
                      <div className="w-full bg-surface-200 rounded-full h-2">
                        <div 
                          className={`bg-gradient-to-r from-${metric.color}-500 to-${metric.color}-600 h-2 rounded-full transition-all duration-1000 ease-out`}
                          style={{ width: `${(metric.value / metric.maxValue) * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-lg font-bold text-surface-800 mt-2 block">{metric.value}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Employee Directory & Recent Activities */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Employee Directory */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
                className="glass-card rounded-2xl p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-surface-800">Employee Directory</h3>
                  <button 
                    onClick={() => setActiveModule('recruitment')}
                    className="text-sm text-primary hover:text-primary-dark font-medium"
                  >
                    View All
                  </button>
                </div>
                
                <div className="relative mb-4">
                  <ApperIcon name="Search" className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-surface-400" />
                  <input
                    type="text"
                    placeholder="Search employees..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 rounded-xl border border-surface-300 focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>

                <div className="space-y-3 max-h-64 overflow-y-auto">
                  {filteredEmployees.map((employee) => (
                    <motion.div
                      key={employee.id}
                      whileHover={{ scale: 1.02 }}
                      onClick={() => handleEmployeeSelect(employee)}
                      className="flex items-center space-x-3 p-3 rounded-xl hover:bg-surface-50 cursor-pointer transition-all duration-200"
                    >
                      <div className="w-10 h-10 bg-gradient-to-r from-primary to-accent rounded-xl flex items-center justify-center">
                        <span className="text-white font-semibold text-sm">{employee.avatar}</span>
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-surface-800">{employee.name}</div>
                        <div className="text-sm text-surface-600">{employee.role} • {employee.department}</div>
                      </div>
                      <div className={`w-3 h-3 rounded-full ${
                        employee.status === 'present' ? 'bg-green-500' :
                        employee.status === 'absent' ? 'bg-red-500' :
                        'bg-yellow-500'
                      }`}></div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Recent Activities */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 }}
                className="glass-card rounded-2xl p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-surface-800">Recent Activities</h3>
                  <button className="text-sm text-primary hover:text-primary-dark font-medium">
                    View All
                  </button>
                </div>

                <div className="space-y-4">
                  {recentActivities.map((activity) => (
                    <div key={activity.id} className="flex items-start space-x-3">
                      <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${
                        activity.type === 'leave' ? 'bg-yellow-100' :
                        activity.type === 'payroll' ? 'bg-green-100' :
                        activity.type === 'recruitment' ? 'bg-blue-100' :
                        'bg-purple-100'
                      }`}>
                        <ApperIcon 
                          name={activity.icon} 
                          className={`w-4 h-4 ${
                            activity.type === 'leave' ? 'text-yellow-600' :
                            activity.type === 'payroll' ? 'text-green-600' :
                            activity.type === 'recruitment' ? 'text-blue-600' :
                            'text-purple-600'
                          }`} 
                        />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-surface-800">{activity.message}</p>
                        <p className="text-xs text-surface-500 mt-1">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

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