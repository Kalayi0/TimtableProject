class Department {
    constructor(id, name) {
      this.id = id;
      this.name = name;
    }
  
    // Retrieve all departments
    static findAll() {
      const departments = [
        new Department(1, 'Agricultural Engineering'),
        new Department(2, 'Biomedical Engineering'),
        new Department(3, 'Computer Engineering'),
        new Department(4, 'Food Processing Engineering'),
        new Department(5, 'Materials Engineering')
      ];
  
      return departments;
    }
  
    // Find a department by its ID
    static findByID(id) {
      // Retrieve all departments
      const departments = Department.findAll();
  
      // Find the department with the specified ID
      const department = departments.find(dep => dep.id === id);
  
      return department;
    }
  }
  
  module.exports = Department;
  