import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'react-toastify'
import ApperIcon from './ApperIcon'

const EmployeeDirectory = () => {
  const [employees, setEmployees] = useState([])
  const [filteredEmployees, setFilteredEmployees] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedDepartment, setSelectedDepartment] = useState('all')
  const [selectedStatus, setSelectedStatus] = useState('all')
  const [sortBy, setSortBy] = useState('name')
  const [currentPage, setCurrentPage] = useState(1)
  const [employeesPerPage] = useState(10)
  const [selectedEmployee, setSelectedEmployee] = useState(null)
  const [isAddingEmployee, setIsAddingEmployee] = useState(false)
  const [isEditingEmployee, setIsEditingEmployee] = useState(false)
  const [selectedEmployees, setSelectedEmployees] = useState([])
  const [formData, setFormData] = useState({})

  // Demo employee data
  const demoEmployees = [
    {
      id: 1,
      name: 'Arjun Sharma',
      email: 'arjun.sharma@talentflow.com',
      phone: '+91 98765 43210',
      department: 'Engineering',
      position: 'Senior React Developer',
      status: 'active',
      joinDate: '2022-03-15',
      salary: 1200000,
      manager: 'Rajesh Kumar',
      location: 'Bangalore',
      avatar: 'AS',
      skills: ['React', 'JavaScript', 'Node.js'],
      experience: '5 years'
    },
    {
      id: 2,
      name: 'Priya Patel',
      email: 'priya.patel@talentflow.com',
      phone: '+91 98765 43211',
      department: 'Design',
      position: 'UI/UX Designer',
      status: 'active',
      joinDate: '2021-08-20',
      salary: 900000,
      manager: 'Sneha Gupta',
      location: 'Mumbai',
      avatar: 'PP',
      skills: ['Figma', 'Adobe XD', 'Sketch'],
      experience: '4 years'
    },
    {
      id: 3,
      name: 'Rahul Kumar',
      email: 'rahul.kumar@talentflow.com',
      phone: '+91 98765 43212',
      department: 'Marketing',
      position: 'Marketing Manager',
      status: 'active',
      joinDate: '2020-12-10',
      salary: 1000000,
      manager: 'Vikram Singh',
      location: 'Delhi',
      avatar: 'RK',
      skills: ['Digital Marketing', 'SEO', 'Analytics'],
      experience: '6 years'
    },
    {
      id: 4,
      name: 'Sneha Gupta',
      email: 'sneha.gupta@talentflow.com',
      phone: '+91 98765 43213',
      department: 'HR',
      position: 'HR Specialist',
      status: 'active',
      joinDate: '2019-05-25',
      salary: 800000,
      manager: 'Amit Sharma',
      location: 'Pune',
      avatar: 'SG',
      skills: ['Recruitment', 'Employee Relations', 'Training'],
      experience: '7 years'
    },
    {
      id: 5,
      name: 'Vikram Singh',
      email: 'vikram.singh@talentflow.com',
      phone: '+91 98765 43214',
      department: 'Engineering',
      position: 'DevOps Engineer',
      status: 'on-leave',
      joinDate: '2021-11-05',
      salary: 1100000,
      manager: 'Rajesh Kumar',
      location: 'Hyderabad',
      avatar: 'VS',
      skills: ['AWS', 'Docker', 'Kubernetes'],
      experience: '4 years'
    },
    {
      id: 6,
      name: 'Anita Desai',
      email: 'anita.desai@talentflow.com',
      phone: '+91 98765 43215',
      department: 'Finance',
      position: 'Financial Analyst',
      status: 'active',
      joinDate: '2020-07-12',
      salary: 850000,
      manager: 'Suresh Patel',
      location: 'Chennai',
      avatar: 'AD',
      skills: ['Financial Analysis', 'Excel', 'SAP'],
      experience: '5 years'
    },
    {
      id: 7,
      name: 'Ravi Mehta',
      email: 'ravi.mehta@talentflow.com',
      phone: '+91 98765 43216',
      department: 'Sales',
      position: 'Sales Representative',
      status: 'active',
      joinDate: '2022-01-18',
      salary: 700000,
      manager: 'Priya Sharma',
      location: 'Kolkata',
      avatar: 'RM',
      skills: ['Sales', 'CRM', 'Lead Generation'],
      experience: '3 years'
    },
    {
      id: 8,
      name: 'Kavita Joshi',
      email: 'kavita.joshi@talentflow.com',
      phone: '+91 98765 43217',
      department: 'Engineering',
      position: 'Backend Developer',
      status: 'inactive',
      joinDate: '2021-04-03',
      salary: 950000,
      manager: 'Rajesh Kumar',
      location: 'Bangalore',
      avatar: 'KJ',
      skills: ['Python', 'Django', 'PostgreSQL'],
      experience: '4 years'
    }
  ]

  const departments = ['Engineering', 'Design', 'Marketing', 'HR', 'Finance', 'Sales']
  const statuses = ['active', 'inactive', 'on-leave']

  useEffect(() => {
    setEmployees(demoEmployees)
    setFilteredEmployees(demoEmployees)
  }, [])

  useEffect(() => {
    let filtered = employees.filter(emp => {
      const matchesSearch = emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          emp.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          emp.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          emp.position.toLowerCase().includes(searchTerm.toLowerCase())
      
      const matchesDepartment = selectedDepartment === 'all' || emp.department === selectedDepartment
      const matchesStatus = selectedStatus === 'all' || emp.status === selectedStatus
      
      return matchesSearch && matchesDepartment && matchesStatus
    })

    // Sort employees
    filtered = filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name)
        case 'department':
          return a.department.localeCompare(b.department)
        case 'joinDate':
          return new Date(b.joinDate) - new Date(a.joinDate)
        case 'salary':
          return b.salary - a.salary
        default:
          return 0
      }
    })

    setFilteredEmployees(filtered)
    setCurrentPage(1)
  }, [employees, searchTerm, selectedDepartment, selectedStatus, sortBy])

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleAddEmployee = () => {
    if (!formData.name || !formData.email || !formData.department || !formData.position) {
      toast.error('Please fill all required fields')
      return
    }

    const newEmployee = {
      id: employees.length + 1,
      ...formData,
      avatar: formData.name.split(' ').map(n => n[0]).join('').toUpperCase(),
      joinDate: new Date().toISOString().split('T')[0],
      status: 'active'
    }

    setEmployees(prev => [...prev, newEmployee])
    setFormData({})
    setIsAddingEmployee(false)
    toast.success('Employee added successfully!')
  }

  const handleEditEmployee = () => {
    if (!formData.name || !formData.email || !formData.department || !formData.position) {
      toast.error('Please fill all required fields')
      return
    }

    setEmployees(prev => 
      prev.map(emp => 
        emp.id === selectedEmployee.id 
          ? { ...emp, ...formData }
          : emp
      )
    )
    setSelectedEmployee(null)
    setIsEditingEmployee(false)
    setFormData({})
    toast.success('Employee updated successfully!')
  }

  const handleDeleteEmployee = (employeeId) => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      setEmployees(prev => prev.filter(emp => emp.id !== employeeId))
      toast.success('Employee deleted successfully!')
    }
  }

  const handleBulkDelete = () => {
    if (selectedEmployees.length === 0) {
      toast.error('Please select employees to delete')
      return
    }

    if (window.confirm(`Are you sure you want to delete ${selectedEmployees.length} employee(s)?`)) {
      setEmployees(prev => prev.filter(emp => !selectedEmployees.includes(emp.id)))
      setSelectedEmployees([])
      toast.success(`${selectedEmployees.length} employee(s) deleted successfully!`)
    }
  }

  const handleExport = (format) => {
    toast.success(`Employee data exported as ${format.toUpperCase()}`)
  }

  const toggleEmployeeSelection = (employeeId) => {
    setSelectedEmployees(prev => 
      prev.includes(employeeId) 
        ? prev.filter(id => id !== employeeId)
        : [...prev, employeeId]
    )
  }

  const selectAllEmployees = () => {
    const currentPageEmployees = getCurrentPageEmployees().map(emp => emp.id)
    setSelectedEmployees(prev => 
      prev.length === currentPageEmployees.length 
        ? []
        : currentPageEmployees
    )
  }

  const getCurrentPageEmployees = () => {
    const indexOfLastEmployee = currentPage * employeesPerPage
    const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage
    return filteredEmployees.slice(indexOfFirstEmployee, indexOfLastEmployee)
  }

  const paginate = (pageNumber) => setCurrentPage(pageNumber)

  const totalPages = Math.ceil(filteredEmployees.length / employeesPerPage)
  const currentEmployees = getCurrentPageEmployees()

  const departmentStats = departments.map(dept => ({
    name: dept,
    count: employees.filter(emp => emp.department === dept).length,
    active: employees.filter(emp => emp.department === dept && emp.status === 'active').length
  }))

  const EmployeeForm = ({ employee, onSave, onCancel, title }) => (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
    >
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-surface-200">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold text-surface-800">{title}</h3>
            <button
              onClick={onCancel}
              className="p-2 rounded-xl hover:bg-surface-100 transition-colors"
            >
              <ApperIcon name="X" className="w-5 h-5 text-surface-600" />
            </button>
          </div>
        </div>
        
        <div className="p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="form-label">Full Name *</label>
              <input
                type="text"
                className="form-input"
                placeholder="Enter full name"
                value={formData.name || ''}
                onChange={(e) => handleInputChange('name', e.target.value)}
              />
            </div>
            
            <div>
              <label className="form-label">Email *</label>
              <input
                type="email"
                className="form-input"
                placeholder="Enter email address"
                value={formData.email || ''}
                onChange={(e) => handleInputChange('email', e.target.value)}
              />
            </div>
            
            <div>
              <label className="form-label">Phone</label>
              <input
                type="tel"
                className="form-input"
                placeholder="Enter phone number"
                value={formData.phone || ''}
                onChange={(e) => handleInputChange('phone', e.target.value)}
              />
            </div>
            
            <div>
              <label className="form-label">Department *</label>
              <select
                className="form-input"
                value={formData.department || ''}
                onChange={(e) => handleInputChange('department', e.target.value)}
              >
                <option value="">Select department</option>
                {departments.map(dept => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="form-label">Position *</label>
              <input
                type="text"
                className="form-input"
                placeholder="Enter job position"
                value={formData.position || ''}
                onChange={(e) => handleInputChange('position', e.target.value)}
              />
            </div>
            
            <div>
              <label className="form-label">Manager</label>
              <input
                type="text"
                className="form-input"
                placeholder="Enter manager name"
                value={formData.manager || ''}
                onChange={(e) => handleInputChange('manager', e.target.value)}
              />
            </div>
            
            <div>
              <label className="form-label">Location</label>
              <input
                type="text"
                className="form-input"
                placeholder="Enter work location"
                value={formData.location || ''}
                onChange={(e) => handleInputChange('location', e.target.value)}
              />
            </div>
            
            <div>
              <label className="form-label">Salary (₹)</label>
              <input
                type="number"
                className="form-input"
                placeholder="Enter annual salary"
                value={formData.salary || ''}
                onChange={(e) => handleInputChange('salary', e.target.value)}
              />
            </div>
            
            <div>
              <label className="form-label">Experience</label>
              <input
                type="text"
                className="form-input"
                placeholder="e.g., 3 years"
                value={formData.experience || ''}
                onChange={(e) => handleInputChange('experience', e.target.value)}
              />
            </div>
            
            <div>
              <label className="form-label">Status</label>
              <select
                className="form-input"
                value={formData.status || 'active'}
                onChange={(e) => handleInputChange('status', e.target.value)}
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="on-leave">On Leave</option>
              </select>
            </div>
          </div>
          
          <div>
            <label className="form-label">Skills</label>
            <input
              type="text"
              className="form-input"
              placeholder="Enter skills (comma separated)"
              value={formData.skills ? formData.skills.join(', ') : ''}
              onChange={(e) => handleInputChange('skills', e.target.value.split(', ').filter(s => s.trim()))}
            />
          </div>
        </div>
        
        <div className="p-6 border-t border-surface-200 flex space-x-3">
          <button
            onClick={onSave}
            className="btn-primary flex-1"
          >
            {employee ? 'Update Employee' : 'Add Employee'}
          </button>
          <button
            onClick={onCancel}
            className="btn-secondary flex-1"
          >
            Cancel
          </button>
        </div>
      </div>
    </motion.div>
  )

  const EmployeeProfile = ({ employee, onClose, onEdit }) => (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
    >
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-surface-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gradient-to-r from-primary to-accent rounded-2xl flex items-center justify-center">
                <span className="text-white font-bold text-xl">{employee.avatar}</span>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-surface-800">{employee.name}</h3>
                <p className="text-surface-600">{employee.position}</p>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  employee.status === 'active' ? 'bg-green-100 text-green-800' :
                  employee.status === 'inactive' ? 'bg-red-100 text-red-800' :
                  'bg-yellow-100 text-yellow-800'
                }`}>
                  {employee.status}
                </span>
              </div>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => onEdit(employee)}
                className="p-2 rounded-xl bg-blue-100 text-blue-600 hover:bg-blue-200 transition-colors"
              >
                <ApperIcon name="Edit" className="w-5 h-5" />
              </button>
              <button
                onClick={onClose}
                className="p-2 rounded-xl hover:bg-surface-100 transition-colors"
              >
                <ApperIcon name="X" className="w-5 h-5 text-surface-600" />
              </button>
            </div>
          </div>
        </div>
        
        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-sm font-semibold text-surface-600 mb-3">Contact Information</h4>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <ApperIcon name="Mail" className="w-4 h-4 text-surface-400" />
                  <span className="text-sm text-surface-700">{employee.email}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <ApperIcon name="Phone" className="w-4 h-4 text-surface-400" />
                  <span className="text-sm text-surface-700">{employee.phone}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <ApperIcon name="MapPin" className="w-4 h-4 text-surface-400" />
                  <span className="text-sm text-surface-700">{employee.location}</span>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="text-sm font-semibold text-surface-600 mb-3">Work Information</h4>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <ApperIcon name="Building" className="w-4 h-4 text-surface-400" />
                  <span className="text-sm text-surface-700">{employee.department}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <ApperIcon name="User" className="w-4 h-4 text-surface-400" />
                  <span className="text-sm text-surface-700">Reports to: {employee.manager}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <ApperIcon name="Calendar" className="w-4 h-4 text-surface-400" />
                  <span className="text-sm text-surface-700">Joined: {new Date(employee.joinDate).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <ApperIcon name="Clock" className="w-4 h-4 text-surface-400" />
                  <span className="text-sm text-surface-700">Experience: {employee.experience}</span>
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="text-sm font-semibold text-surface-600 mb-3">Skills</h4>
            <div className="flex flex-wrap gap-2">
              {employee.skills?.map((skill, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="text-sm font-semibold text-surface-600 mb-3">Compensation</h4>
            <div className="bg-green-50 border border-green-200 rounded-xl p-4">
              <div className="text-2xl font-bold text-green-800">
                ₹{employee.salary?.toLocaleString('en-IN')}
              </div>
              <div className="text-sm text-green-600">Annual Salary</div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-teal-500 to-teal-600 rounded-xl flex items-center justify-center">
            <ApperIcon name="UserSearch" className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-surface-800">Employee Directory</h2>
        </div>
        
        <div className="flex space-x-3">
          <button
            onClick={() => {
              setFormData({})
              setIsAddingEmployee(true)
            }}
            className="btn-primary"
          >
            <ApperIcon name="UserPlus" className="w-4 h-4 mr-2" />
            Add Employee
          </button>
          
          <div className="flex space-x-2">
            <button
              onClick={() => handleExport('pdf')}
              className="btn-secondary"
            >
              <ApperIcon name="Download" className="w-4 h-4 mr-2" />
              Export PDF
            </button>
            <button
              onClick={() => handleExport('excel')}
              className="btn-secondary"
            >
              <ApperIcon name="FileSpreadsheet" className="w-4 h-4 mr-2" />
              Export Excel
            </button>
          </div>
        </div>
      </div>

      {/* Department Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {departmentStats.map((dept) => (
          <div key={dept.name} className="glass-card rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-surface-800">{dept.count}</div>
            <div className="text-sm font-medium text-surface-700">{dept.name}</div>
            <div className="text-xs text-surface-500">{dept.active} active</div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="glass-card rounded-2xl p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
          <div className="relative">
            <ApperIcon name="Search" className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-surface-400" />
            <input
              type="text"
              placeholder="Search employees..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="form-input pl-10"
            />
          </div>
          
          <select
            value={selectedDepartment}
            onChange={(e) => setSelectedDepartment(e.target.value)}
            className="form-input"
          >
            <option value="all">All Departments</option>
            {departments.map(dept => (
              <option key={dept} value={dept}>{dept}</option>
            ))}
          </select>
          
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="form-input"
          >
            <option value="all">All Status</option>
            {statuses.map(status => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>
          
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="form-input"
          >
            <option value="name">Sort by Name</option>
            <option value="department">Sort by Department</option>
            <option value="joinDate">Sort by Join Date</option>
            <option value="salary">Sort by Salary</option>
          </select>
        </div>
        
        {selectedEmployees.length > 0 && (
          <div className="flex items-center justify-between bg-blue-50 border border-blue-200 rounded-xl p-3">
            <span className="text-sm font-medium text-blue-800">
              {selectedEmployees.length} employee(s) selected
            </span>
            <button
              onClick={handleBulkDelete}
              className="px-3 py-1 bg-red-100 text-red-800 rounded-lg text-sm font-medium hover:bg-red-200 transition-colors"
            >
              Delete Selected
            </button>
          </div>
        )}
      </div>

      {/* Employee List */}
      <div className="glass-card rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-surface-50">
              <tr>
                <th className="text-left p-4">
                  <input
                    type="checkbox"
                    onChange={selectAllEmployees}
                    checked={selectedEmployees.length === currentEmployees.length && currentEmployees.length > 0}
                    className="rounded border-surface-300"
                  />
                </th>
                <th className="text-left p-4 font-semibold text-surface-700">Employee</th>
                <th className="text-left p-4 font-semibold text-surface-700">Department</th>
                <th className="text-left p-4 font-semibold text-surface-700">Position</th>
                <th className="text-left p-4 font-semibold text-surface-700">Status</th>
                <th className="text-left p-4 font-semibold text-surface-700">Join Date</th>
                <th className="text-left p-4 font-semibold text-surface-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentEmployees.map((employee) => (
                <tr key={employee.id} className="border-b border-surface-100 hover:bg-surface-50">
                  <td className="p-4">
                    <input
                      type="checkbox"
                      checked={selectedEmployees.includes(employee.id)}
                      onChange={() => toggleEmployeeSelection(employee.id)}
                      className="rounded border-surface-300"
                    />
                  </td>
                  <td className="p-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-primary to-accent rounded-xl flex items-center justify-center">
                        <span className="text-white font-semibold text-sm">{employee.avatar}</span>
                      </div>
                      <div>
                        <div className="font-semibold text-surface-800">{employee.name}</div>
                        <div className="text-sm text-surface-600">{employee.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-surface-600">{employee.department}</td>
                  <td className="p-4 text-surface-600">{employee.position}</td>
                  <td className="p-4">
                    <span className={`status-badge ${
                      employee.status === 'active' ? 'status-approved' :
                      employee.status === 'inactive' ? 'status-absent' :
                      'status-pending'
                    }`}>
                      {employee.status}
                    </span>
                  </td>
                  <td className="p-4 text-surface-600">
                    {new Date(employee.joinDate).toLocaleDateString()}
                  </td>
                  <td className="p-4">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => setSelectedEmployee(employee)}
                        className="p-1.5 rounded-lg bg-blue-100 text-blue-600 hover:bg-blue-200 transition-colors"
                        title="View Profile"
                      >
                        <ApperIcon name="Eye" className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => {
                          setFormData(employee)
                          setSelectedEmployee(employee)
                          setIsEditingEmployee(true)
                        }}
                        className="p-1.5 rounded-lg bg-green-100 text-green-600 hover:bg-green-200 transition-colors"
                        title="Edit Employee"
                      >
                        <ApperIcon name="Edit" className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteEmployee(employee.id)}
                        className="p-1.5 rounded-lg bg-red-100 text-red-600 hover:bg-red-200 transition-colors"
                        title="Delete Employee"
                      >
                        <ApperIcon name="Trash2" className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        {totalPages > 1 && (
          <div className="p-4 border-t border-surface-200 flex items-center justify-between">
            <div className="text-sm text-surface-600">
              Showing {((currentPage - 1) * employeesPerPage) + 1} to {Math.min(currentPage * employeesPerPage, filteredEmployees.length)} of {filteredEmployees.length} employees
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-3 py-1 rounded-lg bg-surface-100 text-surface-600 hover:bg-surface-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Previous
              </button>
              {[...Array(totalPages)].map((_, index) => (
                <button
                  key={index + 1}
                  onClick={() => paginate(index + 1)}
                  className={`px-3 py-1 rounded-lg transition-colors ${
                    currentPage === index + 1
                      ? 'bg-primary text-white'
                      : 'bg-surface-100 text-surface-600 hover:bg-surface-200'
                  }`}
                >
                  {index + 1}
                </button>
              ))}
              <button
                onClick={() => paginate(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-3 py-1 rounded-lg bg-surface-100 text-surface-600 hover:bg-surface-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Modals */}
      <AnimatePresence>
        {isAddingEmployee && (
          <EmployeeForm
            title="Add New Employee"
            onSave={handleAddEmployee}
            onCancel={() => {
              setIsAddingEmployee(false)
              setFormData({})
            }}
          />
        )}
        
        {isEditingEmployee && selectedEmployee && (
          <EmployeeForm
            employee={selectedEmployee}
            title="Edit Employee"
            onSave={handleEditEmployee}
            onCancel={() => {
              setIsEditingEmployee(false)
              setSelectedEmployee(null)
              setFormData({})
            }}
          />
        )}
        
        {selectedEmployee && !isEditingEmployee && (
          <EmployeeProfile
            employee={selectedEmployee}
            onClose={() => setSelectedEmployee(null)}
            onEdit={(employee) => {
              setFormData(employee)
              setIsEditingEmployee(true)
            }}
          />
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default EmployeeDirectory