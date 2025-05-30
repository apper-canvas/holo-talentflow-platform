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
export const calculateTax = (formData, setFormData) => {
  const annualSalary = (parseFloat(formData.grossSalary) || 0) * 12
  const taxSavings = parseFloat(formData.taxSavings) || 0
  const taxableIncome = Math.max(0, annualSalary - taxSavings)
  
  let incomeTax = 0
  
  // New Tax Regime (default) - FY 2024-25
  if (formData.taxRegime === 'new' || !formData.taxRegime) {
    if (taxableIncome > 300000) {
      if (taxableIncome <= 600000) {
        incomeTax = (taxableIncome - 300000) * 0.05
      } else if (taxableIncome <= 900000) {
        incomeTax = 300000 * 0.05 + (taxableIncome - 600000) * 0.10
      } else if (taxableIncome <= 1200000) {
        incomeTax = 300000 * 0.05 + 300000 * 0.10 + (taxableIncome - 900000) * 0.15
      } else if (taxableIncome <= 1500000) {
        incomeTax = 300000 * 0.05 + 300000 * 0.10 + 300000 * 0.15 + (taxableIncome - 1200000) * 0.20
      } else {
        incomeTax = 300000 * 0.05 + 300000 * 0.10 + 300000 * 0.15 + 300000 * 0.20 + (taxableIncome - 1500000) * 0.30
      }
    }
  } else {
    // Old Tax Regime
    const standardDeduction = 50000
    const adjustedIncome = Math.max(0, taxableIncome - standardDeduction)
    
    if (adjustedIncome > 250000) {
      if (adjustedIncome <= 500000) {
        incomeTax = (adjustedIncome - 250000) * 0.05
      } else if (adjustedIncome <= 1000000) {
        incomeTax = 250000 * 0.05 + (adjustedIncome - 500000) * 0.20
      } else {
        incomeTax = 250000 * 0.05 + 500000 * 0.20 + (adjustedIncome - 1000000) * 0.30
      }
    }
  }
  
  // Health and Education Cess (4% on income tax)
  const cess = incomeTax * 0.04
  const totalIncomeTax = incomeTax + cess
  
  // Professional Tax (state-specific)
  let professionalTax = 0
  const monthlySalary = parseFloat(formData.grossSalary) || 0
  const state = formData.state || ''
  
  if (state === 'maharashtra' && monthlySalary > 21000) {
    professionalTax = 200 * 12
  } else if (state === 'karnataka' && monthlySalary > 15000) {
    professionalTax = 200 * 12
  } else if (state === 'west bengal' && monthlySalary > 10000) {
    professionalTax = 110 * 12
  } else if (state === 'gujarat' && monthlySalary > 9000) {
    professionalTax = 150 * 12
  } else if (state === 'andhra pradesh' && monthlySalary > 8500) {
    professionalTax = 150 * 12
  }
  
  const totalTaxLiability = totalIncomeTax + professionalTax
  const monthlyTaxDeduction = totalTaxLiability / 12
  const salaryAfterTax = monthlySalary - monthlyTaxDeduction
  
  setFormData(prev => ({
    ...prev,
    annualSalary,
    taxableIncome,
    incomeTax: totalIncomeTax,
    professionalTax,
    totalTaxLiability,
    monthlyTaxDeduction,
    salaryAfterTax
  }))
  
  toast.success('Tax calculations completed successfully!')
}
}