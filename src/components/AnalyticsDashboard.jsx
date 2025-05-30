import { motion } from 'framer-motion'
import ApperIcon from './ApperIcon'
import Chart from 'react-apexcharts'
import { getChartOptions } from '../utils/chartConfigs'
import { generateCustomReport, exportReport } from '../utils/hrDataUtils'

const AnalyticsDashboard = ({ analyticsData, reportFilters, onReportFilterChange }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-xl flex items-center justify-center">
          <ApperIcon name="BarChart3" className="w-6 h-6 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-surface-800">HR Analytics Dashboard</h2>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {analyticsData.keyMetrics?.map((metric, index) => (
          <div key={index} className="glass-card rounded-2xl p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-surface-600">{metric.label}</h3>
              <div className={`flex items-center text-xs ${
                metric.trend === 'up' ? 'text-green-600' : 'text-red-600'
              }`}>
                <ApperIcon 
                  name={metric.trend === 'up' ? 'TrendingUp' : 'TrendingDown'} 
                  className="w-3 h-3 mr-1" 
                />
                {metric.change}
              </div>
            </div>
            <div className="text-2xl font-bold text-surface-800">{metric.value}</div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Turnover Trend */}
        <div className="glass-card rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-surface-800 mb-4">Turnover Trend</h3>
          {analyticsData.turnoverTrend && (
            <Chart
              options={getChartOptions('line', analyticsData.turnoverTrend)}
              series={[{ name: 'Turnover %', data: analyticsData.turnoverTrend.data }]}
              type="line"
              height={200}
            />
          )}
        </div>

        {/* Department Headcount */}
        <div className="glass-card rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-surface-800 mb-4">Department Headcount</h3>
          {analyticsData.departmentHeadcount && (
            <Chart
              options={getChartOptions('donut', analyticsData.departmentHeadcount)}
              series={analyticsData.departmentHeadcount.data}
              type="donut"
              height={200}
            />
          )}
        </div>

        {/* Salary Distribution */}
        <div className="glass-card rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-surface-800 mb-4">Salary Distribution</h3>
          {analyticsData.salaryDistribution && (
            <Chart
              options={{
                ...getChartOptions('bar', analyticsData.salaryDistribution),
                colors: ['#10b981']
              }}
              series={[{ name: 'Employees', data: analyticsData.salaryDistribution.data }]}
              type="bar"
              height={200}
            />
          )}
        </div>

        {/* Recruitment Funnel */}
        <div className="glass-card rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-surface-800 mb-4">Recruitment Funnel</h3>
          {analyticsData.recruitmentFunnel && (
            <Chart
              options={{
                ...getChartOptions('horizontalBar', analyticsData.recruitmentFunnel),
                colors: ['#f59e0b']
              }}
              series={[{ name: 'Count', data: analyticsData.recruitmentFunnel.data }]}
              type="bar"
              height={200}
            />
          )}
        </div>
      </div>

      {/* Custom Reports */}
      <div className="glass-card rounded-2xl p-6">
        <h3 className="text-lg font-semibold text-surface-800 mb-4">Generate Custom Reports</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
          <div>
            <label className="form-label">Report Type</label>
            <select
              className="form-input"
              value={reportFilters.reportType}
              onChange={(e) => onReportFilterChange('reportType', e.target.value)}
            >
              <option value="turnover">Turnover Analysis</option>
              <option value="attendance">Attendance Report</option>
              <option value="recruitment">Recruitment Analytics</option>
              <option value="payroll">Payroll Summary</option>
            </select>
          </div>
          
          <div>
            <label className="form-label">Department</label>
            <select
              className="form-input"
              value={reportFilters.department}
              onChange={(e) => onReportFilterChange('department', e.target.value)}
            >
              <option value="all">All Departments</option>
              <option value="engineering">Engineering</option>
              <option value="sales">Sales</option>
              <option value="marketing">Marketing</option>
              <option value="hr">HR</option>
              <option value="finance">Finance</option>
            </select>
          </div>
          
          <div>
            <label className="form-label">Date Range</label>
            <select
              className="form-input"
              value={reportFilters.dateRange}
              onChange={(e) => onReportFilterChange('dateRange', e.target.value)}
            >
              <option value="7days">Last 7 Days</option>
              <option value="30days">Last 30 Days</option>
              <option value="quarter">This Quarter</option>
              <option value="year">This Year</option>
            </select>
          </div>
          
          <div className="flex items-end">
            <button
              onClick={() => generateCustomReport(reportFilters)}
              className="btn-primary w-full"
            >
              Generate Report
            </button>
          </div>
        </div>
        
        <div className="flex space-x-2">
          <button
            onClick={() => exportReport('pdf')}
            className="btn-secondary"
          >
            <ApperIcon name="Download" className="w-4 h-4 mr-2" />
            Export PDF
          </button>
          <button
            onClick={() => exportReport('excel')}
            className="btn-secondary"
          >
            <ApperIcon name="FileSpreadsheet" className="w-4 h-4 mr-2" />
            Export Excel
          </button>
        </div>
      </div>
    </motion.div>
  )
}

export default AnalyticsDashboard