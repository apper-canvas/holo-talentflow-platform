import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'react-toastify'
import ApperIcon from './ApperIcon'
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay } from 'date-fns'
import Chart from 'react-apexcharts'

const MainFeature = ({ activeModule }) => {
  const [formData, setFormData] = useState({})
  const [currentDate, setCurrentDate] = useState(new Date())
  const [attendanceData, setAttendanceData] = useState([])
  const [candidates, setCandidates] = useState([])
const [analyticsData, setAnalyticsData] = useState({})
  const [reportFilters, setReportFilters] = useState({
    dateRange: '30days',
    department: 'all',
    reportType: 'turnover'
  })

  // Initialize demo data
  useEffect(() => {
    if (activeModule === 'attendance') {
      generateDemoAttendance()
    } else if (activeModule === 'recruitment') {
      generateDemoCandidates()
    }
  }, [activeModule])
useEffect(() => {
    if (activeModule === 'analytics') {
      generateDemoAnalytics()
    }
  }, [activeModule])

  const generateDemoAttendance = () => {
    const start = startOfMonth(currentDate)
    const end = endOfMonth(currentDate)
    const days = eachDayOfInterval({ start, end })
    
    const attendance = days.map(day => ({
      date: day,
      status: Math.random() > 0.1 ? 'present' : 'absent',
      clockIn: '09:' + String(Math.floor(Math.random() * 30) + 15).padStart(2, '0'),
      clockOut: '18:' + String(Math.floor(Math.random() * 30) + 15).padStart(2, '0')
    }))
    
    setAttendanceData(attendance)
  }

  const generateDemoCandidates = () => {
    const demoData = [
      { id: 1, name: 'Arjun Sharma', position: 'Senior React Developer', status: 'interview', stage: 'Technical Round' },
      { id: 2, name: 'Priya Patel', position: 'Backend Developer', status: 'selected', stage: 'Onboarding' },
      { id: 3, name: 'Rahul Kumar', position: 'DevOps Engineer', status: 'pending', stage: 'HR Round' },
      { id: 4, name: 'Sneha Gupta', position: 'UI/UX Designer', status: 'interview', stage: 'Portfolio Review' },
      { id: 5, name: 'Vikram Singh', position: 'Full Stack Developer', status: 'rejected', stage: 'Final Round' }
    ]
    setCandidates(demoData)
  }
const generateDemoAnalytics = () => {
    const analytics = {
      keyMetrics: [
        { label: 'Employee Turnover Rate', value: '8.2%', trend: 'down', change: '-2.1%' },
        { label: 'Avg. Recruitment Time', value: '21 days', trend: 'down', change: '-5 days' },
        { label: 'Average Salary', value: '₹8.5L', trend: 'up', change: '+12%' },
        { label: 'Employee Satisfaction', value: '4.2/5', trend: 'up', change: '+0.3' }
      ],
      turnoverTrend: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        data: [12, 8, 6, 9, 7, 8]
      },
      departmentHeadcount: {
        labels: ['Engineering', 'Sales', 'Marketing', 'HR', 'Finance'],
        data: [120, 45, 32, 15, 35]
      },
      salaryDistribution: {
        categories: ['0-3L', '3-6L', '6-10L', '10-15L', '15L+'],
        data: [25, 85, 90, 35, 12]
      },
      recruitmentFunnel: {
        labels: ['Applications', 'Screening', 'Interview', 'Offer', 'Hired'],
        data: [450, 180, 95, 42, 28]
      }
    }
    setAnalyticsData(analytics)
  }

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const calculatePayroll = () => {
    const basicSalary = parseFloat(formData.basicSalary) || 0
    const hra = basicSalary * 0.4
    const da = basicSalary * 0.12
    const grossSalary = basicSalary + hra + da
    
    // Indian deductions
    const pf = basicSalary * 0.12
    const esi = grossSalary * 0.0175
    const tds = grossSalary > 50000 ? grossSalary * 0.1 : 0
    const totalDeductions = pf + esi + tds
    
    const netSalary = grossSalary - totalDeductions
    
    setFormData(prev => ({
      ...prev,
      hra,
      da,
      grossSalary,
      pf,
      esi,
      tds,
      netSalary
    }))
    
    toast.success('Payroll calculated successfully!')
  }

  const handleLeaveApplication = () => {
    if (!formData.leaveType || !formData.startDate || !formData.endDate) {
      toast.error('Please fill all required fields')
      return
    }
    
    toast.success('Leave application submitted successfully!')
    setFormData({})
  }

  const updateCandidateStatus = (candidateId, newStatus) => {
    setCandidates(prev => 
      prev.map(candidate => 
        candidate.id === candidateId 
          ? { ...candidate, status: newStatus }
          : candidate
      )
    )
    toast.success('Candidate status updated successfully!')
  }
const handleReportFilterChange = (field, value) => {
    setReportFilters(prev => ({ ...prev, [field]: value }))
  }

  const generateCustomReport = () => {
    toast.success(`Custom ${reportFilters.reportType} report generated for ${reportFilters.department} department (${reportFilters.dateRange})`)
  }

  const exportReport = (format) => {
    toast.success(`Report exported as ${format.toUpperCase()}`)
  }

  const renderAnalyticsDashboard = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
className="space-y-6"
    >
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-xl flex items-center justify-center">
          <ApperIcon name="BarChart3" className="w-6 h-6 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-surface-800">HR Analytics Dashboard</h2>
      </div>
    </motion.div>
  )
    >
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-xl flex items-center justify-center">
          <ApperIcon name="BarChart3" className="w-6 h-6 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-surface-800">HR Analytics Dashboard</h2>
      </div>

  const renderPayrollCalculator = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-green-600 rounded-xl flex items-center justify-center">
          <ApperIcon name="Calculator" className="w-6 h-6 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-surface-800">Payroll Calculator</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Form */}
        <div className="glass-card rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-surface-800 mb-4">Employee Details</h3>
          <div className="space-y-4">
            <div>
              <label className="form-label">Employee Name</label>
              <input
                type="text"
                className="form-input"
placeholder="Enter employee name"
                value={formData.employeeName || ''}
                onChange={(e) => handleInputChange('employeeName', e.target.value)}
              />
            </div>
            
            <div>
              <label className="form-label">Basic Salary (₹)</label>
              <input
                type="number"
                className="form-input"
                placeholder="Enter basic salary"
                value={formData.basicSalary || ''}
                onChange={(e) => handleInputChange('basicSalary', e.target.value)}
              />
            </div>
            
            <div>
              <label className="form-label">Employment Type</label>
              <select
                className="form-input"
                value={formData.employmentType || ''}
                onChange={(e) => handleInputChange('employmentType', e.target.value)}
              >
                <option value="">Select type</option>
                <option value="permanent">Permanent</option>
                <option value="contract">Contract</option>
                <option value="intern">Intern</option>
              </select>
            </div>
            
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={calculatePayroll}
              className="btn-primary w-full"
            >
              Calculate Payroll
            </motion.button>
          </div>
        </div>

        {/* Results */}
        <div className="glass-card rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-surface-800 mb-4">Salary Breakdown</h3>

        {/* Results */}
        <div className="glass-card rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-surface-800 mb-4">Salary Breakdown</h3>
          <div className="space-y-4">
            {/* Earnings */}
            <div className="bg-green-50 border border-green-200 rounded-xl p-4">
              <h4 className="font-semibold text-green-800 mb-2">Earnings</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Basic Salary:</span>
                  <span>₹{(formData.basicSalary || 0).toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between">
                  <span>HRA (40%):</span>
                  <span>₹{(formData.hra || 0).toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between">
                  <span>DA (12%):</span>
                  <span>₹{(formData.da || 0).toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between font-semibold border-t border-green-300 pt-2">
                  <span>Gross Salary:</span>
                  <span>₹{(formData.grossSalary || 0).toLocaleString('en-IN')}</span>
                </div>
              </div>
            </div>

            {/* Deductions */}
            <div className="bg-red-50 border border-red-200 rounded-xl p-4">
              <h4 className="font-semibold text-red-800 mb-2">Deductions</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>PF (12%):</span>
                  <span>₹{(formData.pf || 0).toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between">
                  <span>ESI (1.75%):</span>
                  <span>₹{(formData.esi || 0).toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between">
                  <span>TDS:</span>
                  <span>₹{(formData.tds || 0).toLocaleString('en-IN')}</span>
                </div>
              </div>
            </div>

            {/* Net Salary */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
              <div className="flex justify-between items-center">
                <span className="font-bold text-blue-800">Net Salary:</span>
                <span className="text-2xl font-bold text-blue-800">
                  ₹{(formData.netSalary || 0).toLocaleString('en-IN')}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )

  const renderAttendanceTracker = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
          <ApperIcon name="Clock" className="w-6 h-6 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-surface-800">Attendance & Leave Management</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Clock In/Out */}
        <div className="glass-card rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-surface-800 mb-4">Clock In/Out</h3>
          <div className="text-center space-y-4">
            <div className="text-3xl font-bold text-primary">
              {format(new Date(), 'HH:mm')}
            </div>
            <div className="text-sm text-surface-600">
              {format(new Date(), 'EEEE, MMMM d, yyyy')}
            </div>
            <div className="space-y-2">
              <button className="btn-primary w-full">
                <ApperIcon name="LogIn" className="w-4 h-4 mr-2" />
                Clock In
              </button>
              <button className="btn-secondary w-full">
                <ApperIcon name="LogOut" className="w-4 h-4 mr-2" />
                Clock Out
              </button>
            </div>
          </div>
        </div>

        {/* Leave Application */}
        <div className="glass-card rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-surface-800 mb-4">Apply for Leave</h3>
          <div className="space-y-4">
            <div>
              <label className="form-label">Leave Type</label>
              <select
                className="form-input"
                value={formData.leaveType || ''}
                onChange={(e) => handleInputChange('leaveType', e.target.value)}
              >
                <option value="">Select leave type</option>
                <option value="sick">Sick Leave</option>
                <option value="casual">Casual Leave</option>
                <option value="earned">Earned Leave</option>
                <option value="maternity">Maternity Leave</option>
              </select>
            </div>
            
            <div>
              <label className="form-label">Start Date</label>
              <input
                type="date"
                className="form-input"
                value={formData.startDate || ''}
                onChange={(e) => handleInputChange('startDate', e.target.value)}
              />
            </div>
            
            <div>
              <label className="form-label">End Date</label>
              <input
                type="date"
                className="form-input"
                value={formData.endDate || ''}
                onChange={(e) => handleInputChange('endDate', e.target.value)}
              />
            </div>
            
            <div>
              <label className="form-label">Reason</label>
              <textarea
                className="form-input"
                rows="3"
                placeholder="Enter reason for leave"
                value={formData.reason || ''}
                onChange={(e) => handleInputChange('reason', e.target.value)}
              />
            </div>
            
            <button
              onClick={handleLeaveApplication}
              className="btn-primary w-full"
            >
              Submit Application
            </button>
          </div>
        </div>

        {/* Attendance Calendar */}
        <div className="glass-card rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-surface-800 mb-4">
            {format(currentDate, 'MMMM yyyy')}
          </h3>
          <div className="grid grid-cols-7 gap-1 text-xs">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} className="text-center font-semibold p-2 text-surface-600">
                {day}
              </div>
            ))}
            {attendanceData.slice(0, 35).map((day, index) => (
              <div
                key={index}
                className={`text-center p-2 rounded-lg ${
                  day.status === 'present' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}
              >
                {format(day.date, 'd')}
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )

  const renderRecruitmentPipeline = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl flex items-center justify-center">
          <ApperIcon name="Users" className="w-6 h-6 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-surface-800">Recruitment Pipeline</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-6">
        {[
          { status: 'pending', label: 'Applications', count: candidates.filter(c => c.status === 'pending').length, color: 'yellow' },
          { status: 'interview', label: 'Interview', count: candidates.filter(c => c.status === 'interview').length, color: 'blue' },
          { status: 'selected', label: 'Selected', count: candidates.filter(c => c.status === 'selected').length, color: 'green' },
          { status: 'rejected', label: 'Rejected', count: candidates.filter(c => c.status === 'rejected').length, color: 'red' }
        ].map((stage) => (
          <div key={stage.status} className="glass-card rounded-2xl p-4 text-center">
            <div className={`text-2xl font-bold text-${stage.color}-600 mb-1`}>
              {stage.count}
            </div>
            <div className="text-sm text-surface-600">{stage.label}</div>
          </div>
        ))}
      </div>

      <div className="glass-card rounded-2xl overflow-hidden">
        <div className="p-6 border-b border-surface-200">
          <h3 className="text-lg font-semibold text-surface-800">Candidate Pipeline</h3>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-surface-50">
              <tr>
                <th className="text-left p-4 font-semibold text-surface-700">Candidate</th>
                <th className="text-left p-4 font-semibold text-surface-700">Position</th>
                <th className="text-left p-4 font-semibold text-surface-700">Stage</th>
                <th className="text-left p-4 font-semibold text-surface-700">Status</th>
                <th className="text-left p-4 font-semibold text-surface-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {candidates.map((candidate) => (
                <tr key={candidate.id} className="border-b border-surface-100 hover:bg-surface-50">
                  <td className="p-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center">
                        <span className="text-white font-semibold text-sm">
                          {candidate.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <div className="font-semibold text-surface-800">{candidate.name}</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-surface-600">{candidate.position}</td>
                  <td className="p-4 text-surface-600">{candidate.stage}</td>
                  <td className="p-4">
                    <span className={`status-badge ${
                      candidate.status === 'selected' ? 'status-approved' :
                      candidate.status === 'interview' ? 'status-pending' :
                      candidate.status === 'pending' ? 'bg-gray-100 text-gray-800' :
                      'status-absent'
                    }`}>
                      {candidate.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex space-x-2">
                      {candidate.status === 'pending' && (
                        <button
                          onClick={() => updateCandidateStatus(candidate.id, 'interview')}
                          className="px-3 py-1 bg-blue-100 text-blue-800 rounded-lg text-xs font-medium hover:bg-blue-200"
                        >
                          Interview
                        </button>
                      )}
                      {candidate.status === 'interview' && (
                        <>
                          <button
                            onClick={() => updateCandidateStatus(candidate.id, 'selected')}
                            className="px-3 py-1 bg-green-100 text-green-800 rounded-lg text-xs font-medium hover:bg-green-200"
                          >
                            Select
                          </button>
                          <button
                            onClick={() => updateCandidateStatus(candidate.id, 'rejected')}
                            className="px-3 py-1 bg-red-100 text-red-800 rounded-lg text-xs font-medium hover:bg-red-200"
                          >
                            Reject
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  )

  return (
    <div className="w-full">
      <AnimatePresence mode="wait">
        {activeModule === 'payroll' && (
          <motion.div key="payroll">
            {renderPayrollCalculator()}
          </motion.div>
        )}
        {activeModule === 'attendance' && (
          <motion.div key="attendance">
            {renderAttendanceTracker()}
          </motion.div>
        )}
        {activeModule === 'recruitment' && (
          <motion.div key="recruitment">
            {renderRecruitmentPipeline()}
          </motion.div>
        )}
{activeModule === 'analytics' && (
          <motion.div key="analytics">
            {renderAnalyticsDashboard()}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default MainFeature