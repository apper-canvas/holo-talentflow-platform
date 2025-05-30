import { motion } from 'framer-motion'
import ApperIcon from './ApperIcon'
import { format } from 'date-fns'
import { handleLeaveApplication } from '../utils/hrDataUtils'

const AttendanceTracker = ({ formData, onInputChange, setFormData, currentDate, attendanceData }) => {
  return (
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
                onChange={(e) => onInputChange('leaveType', e.target.value)}
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
                onChange={(e) => onInputChange('startDate', e.target.value)}
              />
            </div>
            
            <div>
              <label className="form-label">End Date</label>
              <input
                type="date"
                className="form-input"
                value={formData.endDate || ''}
                onChange={(e) => onInputChange('endDate', e.target.value)}
              />
            </div>
            
            <div>
              <label className="form-label">Reason</label>
              <textarea
                className="form-input"
                rows="3"
                placeholder="Enter reason for leave"
                value={formData.reason || ''}
                onChange={(e) => onInputChange('reason', e.target.value)}
              />
            </div>
            
            <button
              onClick={() => handleLeaveApplication(formData, setFormData)}
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
}

export default AttendanceTracker