import { motion } from 'framer-motion'
import ApperIcon from './ApperIcon'
import { toast } from 'react-toastify'

const RecruitmentPipeline = ({ candidates, onUpdateCandidateStatus }) => {
  const handleStatusUpdate = (candidateId, newStatus) => {
    onUpdateCandidateStatus(candidateId, newStatus)
    toast.success('Candidate status updated successfully!')
  }

  return (
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
                          onClick={() => handleStatusUpdate(candidate.id, 'interview')}
                          className="px-3 py-1 bg-blue-100 text-blue-800 rounded-lg text-xs font-medium hover:bg-blue-200"
                        >
                          Interview
                        </button>
                      )}
                      {candidate.status === 'interview' && (
                        <>
                          <button
                            onClick={() => handleStatusUpdate(candidate.id, 'selected')}
                            className="px-3 py-1 bg-green-100 text-green-800 rounded-lg text-xs font-medium hover:bg-green-200"
                          >
                            Select
                          </button>
                          <button
                            onClick={() => handleStatusUpdate(candidate.id, 'rejected')}
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
}

export default RecruitmentPipeline