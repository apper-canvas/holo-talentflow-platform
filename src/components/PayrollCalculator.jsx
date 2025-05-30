import { motion } from 'framer-motion'
import ApperIcon from './ApperIcon'
import { calculatePayroll } from '../utils/hrDataUtils'

const PayrollCalculator = ({ formData, onInputChange, setFormData }) => {
  return (
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
    </motion.div>
  )
}

export default PayrollCalculator