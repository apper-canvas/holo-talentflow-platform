import { motion } from 'framer-motion'
import ApperIcon from './ApperIcon'
import { calculatePayroll } from '../utils/hrDataUtils'

const PayrollCalculator = ({ formData, onInputChange, setFormData }) => {
return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-green-600 rounded-xl flex items-center justify-center">
          <ApperIcon name="Calculator" className="w-6 h-6 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-surface-800">Payroll & Tax Calculator</h2>
      </div>

      {/* Payroll Calculator Section */}
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
                onChange={(e) => onInputChange('employeeName', e.target.value)}
              />
            </div>
            
            <div>
              <label className="form-label">Basic Salary (₹)</label>
              <input
                type="number"
                className="form-input"
                placeholder="Enter basic salary"
                value={formData.basicSalary || ''}
                onChange={(e) => onInputChange('basicSalary', e.target.value)}
              />
            </div>
            
            <div>
              <label className="form-label">Employment Type</label>
              <select
                className="form-input"
                value={formData.employmentType || ''}
                onChange={(e) => onInputChange('employmentType', e.target.value)}
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
              onClick={() => calculatePayroll(formData, setFormData)}
              className="btn-primary w-full"
            >
              Calculate Payroll
            </motion.button>
          </div>
        </div>

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

      {/* Tax Calculator Section */}
      <div className="border-t border-surface-200 pt-8">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl flex items-center justify-center">
            <ApperIcon name="FileText" className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-xl font-bold text-surface-800">Tax Calculator</h3>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Tax Input Form */}
          <div className="glass-card rounded-2xl p-6">
            <h4 className="text-lg font-semibold text-surface-800 mb-4">Tax Information</h4>
            <div className="space-y-4">
              <div>
                <label className="form-label">PAN Number</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="Enter PAN number"
                  value={formData.panNumber || ''}
                  onChange={(e) => onInputChange('panNumber', e.target.value.toUpperCase())}
                />
              </div>
              
              <div>
                <label className="form-label">Tax Regime</label>
                <select
                  className="form-input"
                  value={formData.taxRegime || 'new'}
                  onChange={(e) => onInputChange('taxRegime', e.target.value)}
                >
                  <option value="new">New Tax Regime (Default)</option>
                  <option value="old">Old Tax Regime</option>
                </select>
              </div>
              
              <div>
                <label className="form-label">State (for Professional Tax)</label>
                <select
                  className="form-input"
                  value={formData.state || ''}
                  onChange={(e) => onInputChange('state', e.target.value)}
                >
                  <option value="">Select State</option>
                  <option value="maharashtra">Maharashtra</option>
                  <option value="karnataka">Karnataka</option>
                  <option value="west bengal">West Bengal</option>
                  <option value="gujarat">Gujarat</option>
                  <option value="andhra pradesh">Andhra Pradesh</option>
                  <option value="other">Other (No Professional Tax)</option>
                </select>
              </div>
              
              <div>
                <label className="form-label">Annual Tax Savings (₹)</label>
                <input
                  type="number"
                  className="form-input"
                  placeholder="80C, 80D, NPS etc."
                  value={formData.taxSavings || ''}
                  onChange={(e) => onInputChange('taxSavings', e.target.value)}
                />
                <p className="text-xs text-surface-500 mt-1">
                  Include 80C, 80D, NPS and other deductions
                </p>
              </div>
              
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  const { calculateTax } = require('../utils/hrDataUtils')
                  calculateTax(formData, setFormData)
                }}
                className="btn-secondary w-full"
              >
                <ApperIcon name="Calculator" className="w-4 h-4 mr-2" />
                Calculate Taxes
              </motion.button>
            </div>
          </div>

          {/* Tax Results */}
          <div className="glass-card rounded-2xl p-6">
            <h4 className="text-lg font-semibold text-surface-800 mb-4">Tax Breakdown</h4>
            <div className="space-y-4">
              {/* Annual Summary */}
              <div className="bg-purple-50 border border-purple-200 rounded-xl p-4">
                <h5 className="font-semibold text-purple-800 mb-2">Annual Summary</h5>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Annual Gross Salary:</span>
                    <span>₹{(formData.annualSalary || 0).toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax Savings:</span>
                    <span>₹{(formData.taxSavings || 0).toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between font-semibold border-t border-purple-300 pt-2">
                    <span>Taxable Income:</span>
                    <span>₹{(formData.taxableIncome || 0).toLocaleString('en-IN')}</span>
                  </div>
                </div>
              </div>

              {/* Tax Details */}
              <div className="bg-orange-50 border border-orange-200 rounded-xl p-4">
                <h5 className="font-semibold text-orange-800 mb-2">Tax Details</h5>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Income Tax + Cess:</span>
                    <span>₹{(formData.incomeTax || 0).toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Professional Tax:</span>
                    <span>₹{(formData.professionalTax || 0).toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between font-semibold border-t border-orange-300 pt-2">
                    <span>Total Tax Liability:</span>
                    <span>₹{(formData.totalTaxLiability || 0).toLocaleString('en-IN')}</span>
                  </div>
                </div>
              </div>

              {/* Monthly Deduction */}
              <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-red-800">Monthly Tax Deduction:</span>
                  <span className="text-lg font-bold text-red-800">
                    ₹{(formData.monthlyTaxDeduction || 0).toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              {/* Final Salary */}
              <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-green-800">Salary After Tax:</span>
                  <span className="text-2xl font-bold text-green-800">
                    ₹{(formData.salaryAfterTax || 0).toLocaleString('en-IN')}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default PayrollCalculator