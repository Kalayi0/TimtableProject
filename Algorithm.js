// Import necessary libraries/modules
const fs = require('fs');  // For file operations
const xlsx = require('xlsx');  // For Excel file handling
const path = require('path');

// Add other imports as needed

// Define global variables
const MAX_COURSES_PER_WEEK = 2;  // Maximum times a course can appear in a week
const availableRooms = retrieveAvailableRoomsFromExcel('Data/rooms.xlsx'); // Retrieve available rooms
const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
const numTimeSlots = 12;
const availability = {};
const timetable = {
  Monday: new Array(numTimeSlots).fill(null),
  Tuesday: new Array(numTimeSlots).fill(null),
  Wednesday: new Array(numTimeSlots).fill(null),
  Thursday: new Array(numTimeSlots).fill(null),
  Friday: new Array(numTimeSlots).fill(null)
};

// Function to calculate the duration based on credit hours (1 credit hour = 55 minutes)
function calculateDuration(creditHours) {
  return creditHours * 55;
}

// Constraint logic for user authentication
function authenticateUser(username, password) {
    // Predefined admin credentials
    const Preusername = 'admin';
    const Prepassword = 'adminpassword';
  
    // Check if the provided username and password match the admin credentials
    if (username === adminUsername && password === adminPassword) {
      return true;  // Authentication successful
    }
    return false;  // Authentication failed
  }

// Define the courses array to hold course information
let courses = [];
// Function to add or update course information
function addOrUpdateCourse(courseCode, courseName, creditHours) {
  // Check if the course already exists in the courses array
  const existingCourseIndex = courses.findIndex(course => course.courseCode === courseCode);

  if (existingCourseIndex !== -1) {
    // Update the existing course's information
    courses[existingCourseIndex].courseName = courseName;
    courses[existingCourseIndex].creditHours = creditHours;
    console.log(`Updated course: ${courseCode}`);
  } else {
    // Add a new course to the courses array
    const newCourse = {
      courseCode,
      courseName,
      creditHours
    };
    courses.push(newCourse);
    console.log(`Added course: ${courseCode}`);
  }
}


// Function to retrieve courses from the excel files
function retrieveCoursesFromExcel(baseDirectory) {
  try {
    const courses = [];

    // List all department directories in the base directory
    const departments = fs.readdirSync(baseDirectory);

    // Process each department
    departments.forEach(department => {
      const departmentPath = path.join(baseDirectory, department);

      // List all files in the department directory
      const files = fs.readdirSync(departmentPath);

      // Process each Excel file
      files.forEach(file => {
        const filePath = path.join(departmentPath, file);

        const workbook = xlsx.readFile(filePath);
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const range = xlsx.utils.decode_range(sheet['!ref']);

        for (let row = range.s.r + 1; row <= range.e.r; row++) {
          const courseCode = sheet[`A${row}`]?.v;
          const courseName = sheet[`B${row}`]?.v;
          const creditHours = sheet[`C${row}`]?.v;

          if (courseCode && courseName && creditHours) {
            courses.push({
              department,
              courseCode,
              courseName,
              creditHours
            });
          }
        }
      });
    });

    return courses;
  } catch (error) {
    console.error('Error retrieving courses from Excel:', error);
    return [];
  }
}

// Example usage
const baseDirectory = 'Data/Courses/I Semester'; // Update this with the actual path
const retrievedCourses = retrieveCoursesFromExcel(baseDirectory);
console.log(retrievedCourses);


// Loop through each retrieved course
for (const course of retrievedCourses) {
  if (isSpecialCourse(course)) {
    handleSpecialCourse(course, timetable, availability);
  } else {
    scheduleNormalCourse(course, timetable, availability);
  }
}


// Function to check if a course is special
function isSpecialCourse(course) {
  if (course.department === 'FAEN' || course.courseCode === 'INDUSTRIALPRACTICE') {
    return true;
  }
  return false;
}

// Function to handle special courses
function handleSpecialCourse(course) {
  if (course.department === 'FAEN') {
    handleFAENCourse(course);
  } else if (course.courseCode === 'INDUSTRIALPRACTICE') {
    // Skip scheduling for "Industrial Practice" course
    console.log(`Skipping scheduling for Industrial Practice course: ${course.courseCode}`);
  }
}

// Function to handle FAEN courses
function handleFAENCourse(course, timetable, availability) {
  // Find an available time slot for the FAEN course
  const availableTimeSlot = findAvailableTimeSlot(course, timetable, availability);

  if (availableTimeSlot) {
    // Update the timetable with the FAEN course
    timetable[availableTimeSlot.day][availableTimeSlot.timeslot] = course.courseCode;

    // Update the availability for the assigned time slot
    updateAvailability(availableTimeSlot.day, availableTimeSlot.timeslot, course.creditHours);

    console.log(`Scheduled FAEN course ${course.courseCode} on ${availableTimeSlot.day} at timeslot ${availableTimeSlot.timeslot}`);
  } else {
    console.log(`No available time slot found for FAEN course: ${course.courseCode}`);
  }
}

// Function to find an available time slot for the FAEN course
  function findAvailableTimeSlot(course, timetable, availability) {
    availability = {};    
    days.forEach(day => {
    availability[day] = new Array(numTimeSlots).fill(true);
});
    for (const day of days) {
      for (let timeslot = 0; timeslot < numTimeSlots; timeslot++) {
        if (availability[day][timeslot] >= calculateDuration(course.creditHours)) {
          let conflicts = 0;
  
          // Check if the course is already scheduled on this day
          for (let ts = timeslot; ts < timeslot + calculateDuration(course.creditHours); ts++) {
            if (timetable[day][ts] !== null) {
              conflicts++;
            }
          }
  
          // Check if the course has not exceeded the weekly limit
          if (conflicts <= MAX_COURSES_PER_WEEK) {
            return { day, timeslot };
          }
        }
      }
    }
  
    return null; // No available time slot found
  }  

// Update the availability matrix based on the scheduled course
function updateAvailability(day, timeslot, creditHours) {
  const slotsNeeded = Math.ceil(calculateDuration(creditHours) / 55); // Calculate the number of consecutive slots needed
  for (let i = timeslot; i < timeslot + slotsNeeded; i++) {
    availability[day][i] = false; // Mark the slots as unavailable
  }
}
for (const course of courses) {
const availableTimeSlot = findAvailableTimeSlot(course, timetable, availability);
if (availableTimeSlot) {
  // Update the timetable with the FAEN course
  timetable[availableTimeSlot.day][availableTimeSlot.timeslot] = course.courseCode;

  // Update the availability for the assigned time slot
  updateAvailability(availableTimeSlot.day, availableTimeSlot.timeslot, course.creditHours);
console.log(`Scheduled FAEN course ${course.courseCode} on ${availableTimeSlot.day} at timeslot ${availableTimeSlot.timeslot}`);
}else {
  console.log(`No available time slot found for FAEN course: ${course.courseCode}`);
}
}

 // Function to retrieve available rooms from the excel file
function retrieveAvailableRoomsFromExcel(filePath) {
  try {
    const availableRooms = [];

    const workbook = xlsx.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const range = xlsx.utils.decode_range(sheet['!ref']);

    for (let row = range.s.r + 1; row <= range.e.r; row++) {
      const roomNumber = sheet[`A${row}`]?.v;
      const capacity = sheet[`B${row}`]?.v;

      if (roomNumber && capacity) {
        availableRooms.push({
          roomNumber,
          capacity
        });
      }
    }

    return availableRooms;
  } catch (error) {
    console.error('Error retrieving available rooms from Excel:', error);
    return [];
  }
}


// Function to find an available room for the course
function findAvailableRoom(course) {
  for (const room of availableRooms) {
    // Check if the room meets the constraints and preferences for the course
    if (room.capacity >= course.studentCount) {
      // You can add additional checks here based on room preferences or other constraints
      return room.roomNumber;
    }
  }

  return null; // No available room found
}

// Loop through the retrieved courses
for (const course of retrievedCourses) {
  // Find an available room for the course
  const availableRoom = findAvailableRoom(course);

  if (availableRoom !== null) {
    // Update the timetable and availability with the scheduled course
    scheduleNormalCourse(course, availableRoom);
  } else {
    console.log(`No available room found for course: ${course.courseCode}`);
  }
}

// Function to allocate a room and timeslot for a normal course
function scheduleNormalCourse(course, availableRoom, availableTimeSlot) {
  if (availableRoom && availableTimeSlot) {
    // Allocate the course to the room and timeslot
    allocateRoomAndTimeslot(course, availableRoom, availableTimeSlot);

    console.log(`Scheduled course ${course.courseCode} in room ${availableRoom} on ${availableTimeSlot.day} at timeslot ${availableTimeSlot.timeslot}`);
  } else {
    console.log(`No available room or time slot found for course: ${course.courseCode}`);
  }
}

// Normal scheduling logic for non-special courses
function scheduleNormalCourse(course) {
  const availableRoom = findAvailableRoom(course);
  const availableTimeSlot = findAvailableTimeSlot(course);

  if (availableRoom && availableTimeSlot) {
    // Update the timetable with the scheduled course
    timetable[availableTimeSlot.day][availableTimeSlot.timeslot] = course.courseCode;

    // Update the availability for the assigned time slot
    updateAvailability(availableTimeSlot.day, availableTimeSlot.timeslot, course.creditHours);

    console.log(`Scheduled course ${course.courseCode} on ${availableTimeSlot.day} at timeslot ${availableTimeSlot.timeslot}`);
  } else {
    console.log(`No available room or time slot found for course: ${course.courseCode}`);
  }
}
