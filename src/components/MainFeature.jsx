import { motion, AnimatePresence } from 'framer-motion'
import EmployeeDirectory from './EmployeeDirectory'
import AnalyticsDashboard from './AnalyticsDashboard'
import PayrollCalculator from './PayrollCalculator'
import AttendanceTracker from './AttendanceTracker'
import RecruitmentPipeline from './RecruitmentPipeline'
import ActivitiesDashboard from './ActivitiesDashboard'
import { useHRData } from '../hooks/useHRData'

const MainFeature = ({ activeModule }) => {
  const {
    formData,
    setFormData,
    currentDate,
    attendanceData,
    candidates,
    analyticsData,
    reportFilters,
    handleInputChange,
    updateCandidateStatus,
    handleReportFilterChange
  } = useHRData(activeModule)

  return (
    <div className="w-full">
      <AnimatePresence mode="wait">
        {activeModule === 'payroll' && (
          <motion.div key="payroll">
            <PayrollCalculator 
              formData={formData}
              onInputChange={handleInputChange}
              setFormData={setFormData}
            />
          </motion.div>
        )}
        {activeModule === 'attendance' && (
          <motion.div key="attendance">
            <AttendanceTracker 
              formData={formData}
              onInputChange={handleInputChange}
              setFormData={setFormData}
              currentDate={currentDate}
              attendanceData={attendanceData}
            />
          </motion.div>
        )}
        {activeModule === 'recruitment' && (
          <motion.div key="recruitment">
            <RecruitmentPipeline 
              candidates={candidates}
              onUpdateCandidateStatus={updateCandidateStatus}
            />
          </motion.div>
        )}
        {activeModule === 'analytics' && (
          <motion.div key="analytics">
            <AnalyticsDashboard 
              analyticsData={analyticsData}
              reportFilters={reportFilters}
              onReportFilterChange={handleReportFilterChange}
            />
          </motion.div>
        )}
        {activeModule === 'employees' && (
          <motion.div key="employees">
            <EmployeeDirectory />
          </motion.div>
        )}
{activeModule === 'activities' && (
          <motion.div key="activities">
            <ActivitiesDashboard />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default MainFeature