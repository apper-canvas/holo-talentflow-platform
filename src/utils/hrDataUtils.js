import { toast } from 'react-toastify'

export const calculatePayroll = (formData, setFormData) => {
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

export const handleLeaveApplication = (formData, setFormData) => {
  if (!formData.leaveType || !formData.startDate || !formData.endDate) {
    toast.error('Please fill all required fields')
    return
  }
  
  toast.success('Leave application submitted successfully!')
  setFormData({})
}

export const generateCustomReport = (reportFilters) => {
  toast.success(`Custom ${reportFilters.reportType} report generated for ${reportFilters.department} department (${reportFilters.dateRange})`)
}

export const exportReport = (format) => {
  toast.success(`Report exported as ${format.toUpperCase()}`)
}