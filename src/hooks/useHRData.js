import { useState, useEffect } from 'react'
import { startOfMonth, endOfMonth, eachDayOfInterval } from 'date-fns'

export const useHRData = (activeModule) => {
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
    } else if (activeModule === 'analytics') {
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

  const updateCandidateStatus = (candidateId, newStatus) => {
    setCandidates(prev => 
      prev.map(candidate => 
        candidate.id === candidateId 
          ? { ...candidate, status: newStatus }
          : candidate
      )
    )
  }

  const handleReportFilterChange = (field, value) => {
    setReportFilters(prev => ({ ...prev, [field]: value }))
  }

  return {
    formData,
    setFormData,
    currentDate,
    setCurrentDate,
    attendanceData,
    candidates,
    analyticsData,
    reportFilters,
    handleInputChange,
    updateCandidateStatus,
    handleReportFilterChange
  }
}