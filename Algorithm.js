const sequelize = require('./database');
const Course = require('./models/Course');
const SpecialCourse = require('./models/SpecialCourse');
const Classroom = require('./models/Classroom'); 
const fs = require('fs');

// ... Other imports ...

// Constraint logic for user authentication
function userAuthenticationConstraint(username, password) {
  const adminCredentials = {
    username: "admin",
    password: "password123"
  };

  if (username === adminCredentials.username && password === adminCredentials.password) {
    console.log("Authentication successful. Access granted to admin functionalities.");
    window.location.href = "/admin/dashboard.html";
  } else {
    console.log("Authentication failed. Invalid username or password.");
    const errorElement = document.getElementById("error-message");
    const errorMessage = "Invalid username or password. Please try again.";
    errorElement ? (errorElement.innerText = errorMessage) : (window.location.href = "/login.html");
  }
}

// Function to calculate the duration based on credit hours (1 credit hour = 55 minutes)
function calculateDuration(creditHours) {
  return creditHours * 55;
}

// Function to add or update course information
async function addOrUpdateCourse(courseCode, courseName, creditHours, requiresLab) {
  try {
    const existingCourse = await Course.findOne({ where: { code: courseCode } });

    const duration = calculateDuration(creditHours);
    const courseData = { code: courseCode, name: courseName, duration, creditHours, requiresLab };

    if (existingCourse) {
      await existingCourse.update(courseData);
      console.log(`Course ${courseCode} has been updated.`);
    } else {
      await Course.create(courseData);
      console.log(`New course ${courseCode} has been added.`);
    }
  } catch (error) {
    console.error(`Error adding/updating course ${courseCode}:`, error);
    throw error;
  }
}

// Function to retrieve confirmed courses from the database
async function getConfirmedCourses() {
  try {
    return await Course.findAll({
      where: { status: 'confirmed' },
      attributes: ['code', 'name', 'creditHours', 'requiresLab']
    });
  } catch (error) {
    console.error('Error retrieving confirmed courses:', error);
    throw error;
  }
}

// Handle special courses separately
function handleSpecialCourse(specialCourse) {
  if (specialCourse.code === 'FAEN') {
    console.log(`Special course ${specialCourse.code} has been scheduled for all departments at a common time.`);
  } else if (specialCourse.requiresLab) {
    const labRoom = findAvailableLabRoom();
    if (labRoom) {
      console.log(`Special course ${specialCourse.code} has been assigned to lab room ${labRoom.name}.`);
    } else {
      console.log(`Special course ${specialCourse.code} has been excluded from scheduling due to the unavailability of lab rooms.`);
    }
  } else {
    const regularRoom = findAvailableRegularRoom();
    if (regularRoom) {
      console.log(`Special course ${specialCourse.code} has been assigned to regular room ${regularRoom.name}.`);
    } else {
      console.log(`Special course ${specialCourse.code} has been excluded from scheduling due to the unavailability of regular classrooms.`);
    }
  }
}

// Function to find an available lab room
function findAvailableLabRoom() {
  const availableLabRooms = classrooms.filter(classroom => classroom.isAvailable && classroom.isLab);
  return availableLabRooms.length > 0 ? availableLabRooms[0] : null;
}

// Function to find an available regular classroom
function findAvailableRegularRoom() {
  const availableRegularRooms = classrooms.filter(classroom => classroom.isAvailable && !classroom.isLab);
  return availableRegularRooms.length > 0 ? availableRegularRooms[0] : null;
}

// Function to simulate retrieving available days for lecturers
function simulateLecturerAvailability(lecturers) {
  const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  
  return lecturers.map(lecturer => {
    if (lecturer.availableDays && lecturer.availableDays.length > 0) {
      return {
        lecturerId: lecturer.id,
        availableDays: lecturer.availableDays
      };
    } else {
      const randomDays = getRandomDays(daysOfWeek, 2); // You can adjust the number of random days
      return {
        lecturerId: lecturer.id,
        availableDays: randomDays
      };
    }
  });
}

// Function to generate an array of random days
function getRandomDays(daysArray, count) {
  const shuffledDays = daysArray.sort(() => 0.5 - Math.random());
  return shuffledDays.slice(0, count);
}

// Timetable generation
async function generateTimetable(courses, classrooms, lecturers) {
  try {
    // Function to generate the initial timetable
function generateInitialTimetable(confirmedCourses, classrooms) {
  const timetable = []; // Initialize an empty timetable

  // Iterate through each confirmed course
  for (const course of confirmedCourses) {
    const allocatedRoom = allocateRoom(classrooms, course);
    if (allocatedRoom) {
      const allocatedSlot = allocateTimeslot(allocatedRoom, course);
      if (allocatedSlot) {
        const scheduledCourse = {
          course,
          room: allocatedRoom,
          timeslot: allocatedSlot
        };
        timetable.push(scheduledCourse);
      } else {
        console.log(`Could not allocate timeslot for course ${course.code}.`);
      }
    } else {
      console.log(`Could not allocate room for course ${course.code}.`);
    }
  }

  return timetable;
}

// Function to allocate a room for a course
function allocateRoom(classrooms, course) {
  const requiredCapacity = course.students;

  // Find available rooms that meet the capacity requirement
  const availableRooms = classrooms.filter(room => room.isAvailable && room.capacity >= requiredCapacity);

  // You can further consider equipment availability or other preferences here

  if (availableRooms.length > 0) {
    // Sort available rooms by capacity (you can also consider other factors)
    availableRooms.sort((a, b) => a.capacity - b.capacity);

    // Return the room with the closest capacity to the required capacity
    return availableRooms[0];
  } else {
    return null; // No suitable room available
  }
}


// Function to allocate a timeslot for a course in a given room
function allocateTimeslot(room, course) {
  // Filter available timeslots based on room availability and course duration
  const availableSlots = room.timeslots.filter(slot => slot.isAvailable && slot.duration >= course.duration);

  if (availableSlots.length > 0) {
    // Sort available slots by start time (you can consider other factors)
    availableSlots.sort((a, b) => a.startTime - b.startTime);

    // Return the first available slot that meets the course's duration requirement
    return availableSlots[0];
  } else {
    return null; // No suitable timeslot available
  }
}

    const timetable = []; // Placeholder for the generated timetable

    // Logic to allocate courses to timetable slots and classrooms
function allocateCoursesToTimetable(confirmedCourses, classrooms, timetable) {
  confirmedCourses.forEach(course => {
    // Find an available room for the course
    const availableRoom = findAvailableRoom(classrooms, course);

    if (availableRoom) {
      // Allocate a suitable timeslot for the course in the room
      const allocatedTimeslot = allocateTimeslot(availableRoom, course);

      if (allocatedTimeslot) {
        // Update room and timeslot availability
        availableRoom.isAvailable = false;
        allocatedTimeslot.isAvailable = false;

        // Update the timetable with the allocated course
        timetable[allocatedTimeslot.day][allocatedTimeslot.startTime].course = course;
        timetable[allocatedTimeslot.day][allocatedTimeslot.startTime].room = availableRoom;

        console.log(`Allocated course ${course.name} to room ${availableRoom.name} on ${allocatedTimeslot.day} at ${allocatedTimeslot.startTime}.`);
      } else {
        console.log(`No suitable timeslot available for course ${course.name} in room ${availableRoom.name}.`);
        // Handle this case based on your strategy (e.g., reschedule, mark as unscheduled)
      }
    } else {
      console.log(`No available room for course ${course.name}.`);
      // Handle this case based on your strategy (e.g., reschedule, mark as unscheduled)
    }
  });
}


    return timetable;
  } catch (error) {
    console.error('Error generating timetable:', error);
    throw error;
  }
}



//--------------------------------------------------------------------------------------------------------------//
// Main function to start the application
async function startApp() {
  try {
     // Authentication logic
     userAuthenticationConstraint("admin", "password123"); // Example usage of authentication logic

    // Course management
    const confirmedCourses = await getConfirmedCourses();
    const specialCourses = confirmedCourses.filter(course => course.code === 'FAEN');
    const regularCourses = confirmedCourses.filter(course => course.code !== 'FAEN');

    specialCourses.forEach(handleSpecialCourse);

    regularCourses.forEach(course => {
      addOrUpdateCourse(course.code, course.name, course.creditHours, course.requiresLab);
    });

  // Lecturer management
  const lecturers = await retrieveLecturersFromDatabase();
    
  // Simulate lecturer availability if not provided
  const lecturerAvailability = simulateLecturerAvailability(lecturers);


// Apply hard constraints (e.g., room capacity, course prerequisites, etc.)
function applyHardConstraints(timetable) {

// Implement logic to ensure hard constraints are satisfied
  for (const course of timetable.courses) {
    if (!isRoomAvailable(course)) {

 // Handle unavailability of rooms for the course
function handleRoomUnavailability(course, timetable) {
  const availableRooms = findAvailableRooms(course, timetable);

  if (availableRooms.length === 0) {
    console.log(`No available rooms for course ${course.name}.`);

    // Mark the course as unscheduled
    course.status = 'unscheduled'; // Update the course status in the timetable

    // You can also log this action
    console.log(`Course ${course.name} marked as unscheduled.`);
  } else {
    const selectedRoom = availableRooms[0]; // Choose the first available room (you can adjust this logic)
    console.log(`Course ${course.name} assigned to room ${selectedRoom.name}.`);
    course.room = selectedRoom; // Assign the room to the course in the timetable
  }
}

// Function to find available rooms for the course at its scheduled time
function findAvailableRooms(course, timetable) {
  // Get the scheduled day and time for the course
  const scheduledDay = course.day; // Replace with the actual property for the day in your course object
  const scheduledTime = course.time; // Replace with the actual property for the time in your course object

  // Query the timetable for courses scheduled at the same day and time
  const conflictingCourses = timetable.courses.filter(
    otherCourse => otherCourse.day === scheduledDay && otherCourse.time === scheduledTime
  );

  // Get the rooms used by the conflicting courses
  const occupiedRooms = conflictingCourses.map(course => course.room);

  // Filter out the occupied rooms from the list of all rooms
  const availableRooms = timetable.rooms.filter(room => !occupiedRooms.includes(room));

  return availableRooms;
}}
}};


// Apply soft constraints (e.g., minimizing gaps, distributing workload, etc.)
function applySoftConstraints(timetable) {
  // Minimize gaps between consecutive courses for each lecturer
  minimizeGaps(timetable);

  // Distribute workload evenly among lecturers
  distributeWorkload(timetable);

  // Other soft constraint optimizations
  // ...

  return timetable;
}

// Function to minimize gaps between consecutive courses for each lecturer
function minimizeGaps(timetable) {
  // Implement logic to rearrange course timings to minimize gaps
}

// Function to distribute workload evenly among lecturers
function distributeWorkload(timetable) {
  // Implement logic to distribute courses evenly among lecturers
}


// Apply lecturer preferences
function applyLecturerPreferences(timetable, lecturerPreferences) {
  for (const lecturer of timetable.lecturers) {
    const preferredDay = lecturerPreferences[lecturer.id]; // Get preferred day for the lecturer

    if (preferredDay) {
      // Find the courses assigned to this lecturer
      const assignedCourses = timetable.courses.filter(course => course.lecturerId === lecturer.id);

      // Check if any assigned course's day is different from the preferred day
      const coursesWithMismatchedDay = assignedCourses.filter(course => course.day !== preferredDay);

      // If there are courses with mismatched days, reschedule them if possible
      for (const course of coursesWithMismatchedDay) {
        const newDay = findAvailableDayForCourse(course, preferredDay);
        if (newDay) {
          course.day = newDay; // Reschedule the course to the new day
        }
      }
    }
  }

  return timetable;
}

function findAvailableDayForCourse(course, preferredDay, timetable, roomAvailability) {
  const preferredDayIndex = daysOfWeek.indexOf(preferredDay);

  // Loop through the days of the week starting from the preferred day
  for (let dayOffset = 0; dayOffset < daysOfWeek.length; dayOffset++) {
    const currentIndex = (preferredDayIndex + dayOffset) % daysOfWeek.length;
    const currentDay = daysOfWeek[currentIndex];

    // Check if the current day is available for the course
    if (isDayAvailableForCourse(currentDay, course, timetable, roomAvailability)) {
      return currentDay; // Found an available day
    }
  }

  return null; // No available day found
}

function isDayAvailableForCourse(day, course, timetable, roomAvailability) {
  // Check if the lecturer is available on the specified day
  if (!lecturerIsAvailable(course.lecturerId, day, timetable)) {
    return false;
  }

  // Check if the required room is available on the specified day
  if (!roomIsAvailable(course.roomId, day, timetable, roomAvailability)) {
    return false;
  }


  return true;
}

async function lecturerIsAvailable(lecturerId, day, timetable) {
  try {
    // Retrieve the lecturer's schedule/availability for the specified day
    const lecturerAvailability = await getLecturerAvailability(lecturerId, day);

    // Check if the lecturer is available for the entire day
    if (lecturerAvailability.isAvailable) {
      return true;
    }

    // Check if there are any scheduled courses overlapping with the specified day
    const overlappingCourses = timetable.filter(course => {
      return course.lecturerId === lecturerId && course.day === day;
    });

    // If there are overlapping courses, the lecturer is not available
    return overlappingCourses.length === 0;
  } catch (error) {
    console.error('Error checking lecturer availability:', error);
    return false; // Return false in case of error
  }
}

async function getLecturerAvailability(lecturerId, day) {
  try {
    const lecturerAvailability = await LecturerAvailability.findOne({
      where: { lecturerId, day },
      attributes: ['isAvailable']
    });

    return lecturerAvailability;
  } catch (error) {
    console.error('Error retrieving lecturer availability:', error);
    throw error;
  }
}


function roomIsAvailable(roomId, day, timetable, roomAvailability) {
  // Check if the room is available on the specified day
  const roomAvailable = roomAvailability[roomId][day]; // Assuming roomAvailability is an object with room availability data
  
  // Check if the room is already scheduled for any courses on that day
  const coursesScheduledOnDay = timetable[day] || [];
  const isRoomScheduled = coursesScheduledOnDay.some(course => course.roomId === roomId);
  
  // Combine room availability and scheduling information to determine if the room is available
  return roomAvailable && !isRoomScheduled;
}

const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

// Usage example
const newDay = findAvailableDayForCourse(courseToReschedule, lecturerPreferredDay, timetable, roomAvailability);

if (newDay) {
  courseToReschedule.day = newDay; // Reschedule the course to the new day
} else {
  console.log(`Unable to find an available day for rescheduling ${courseToReschedule.name}.`);
}


// Usage example
const lecturerPreferences = {
  1: "Monday",
  2: "Wednesday",
  // ... other lecturer preferences
};

const optimizedTimetable = applyLecturerPreferences(initialTimetable, lecturerPreferences);

function applyRoomPreferencesAndConstraints(timetable, roomPreferences) {
  // Iterate through the timetable and check each scheduled course
  for (const day in timetable) {
    const coursesOnDay = timetable[day];
    for (const course of coursesOnDay) {
      const preferredRoomId = roomPreferences[course.courseId];
      
      if (preferredRoomId) {
        const isRoomAvailable = roomIsAvailable(preferredRoomId, day, timetable, roomAvailability);
        
        if (isRoomAvailable) {
          course.roomId = preferredRoomId; // Assign the preferred room
        } else {
          // Handle the case where the preferred room is not available
          function handleUnavailablePreferredRoom(course, timetable, roomAvailability) {
            const availableRooms = getAvailableRoomsOnDay(course.day, roomAvailability);

          // Check if any available room matches the preferred room type
          const suitableRooms = availableRooms.filter(room => room.type === course.preferredRoomType);

        if (suitableRooms.length > 0) {
        // Assign the course to a suitable available room
        const assignedRoom = suitableRooms[0];
        timetable.assignCourseToRoom(course, assignedRoom);
        console.log(`Course ${course.name} has been assigned to room ${assignedRoom.name}.`);
      } else {
        // No suitable available room, reschedule or apply another strategy
        console.log(`No suitable room available for course ${course.name}. Rescheduling or applying another strategy.`);
        // You can implement further strategies here, like trying a different day or room type
    }
  }

        }
      }
    }
  }
}

// Other constraints and preferences functions
// ...


// Timetable generation
  const generatedTimetable = await generateTimetable(regularCourses, classrooms, lecturers);
  // Apply soft constraints
  applySoftConstraints(generatedTimetable);
  // Generate the initial timetable
  const initialTimetable = generateInitialTimetable(confirmedCourses, classrooms);
  // Apply lecturer preferences
  applyLecturerPreferences(generatedTimetable);

  // Apply room preferences and constraints
  applyRoomPreferencesAndConstraints(generatedTimetable);
  // Apply constraints and preferences to the initial timetable
  applySoftConstraints(initialTimetable);
  applyLecturerPreferences(initialTimetable);
  applyRoomPreferencesAndConstraints(initialTimetable);


  // Timetable adjustments
  // Resolve Course Conflicts
function resolveCourseConflicts(timetable) {
  const conflicts = findCourseConflicts(timetable);

  for (const conflict of conflicts) {
    const { courseA, courseB } = conflict;

    const newTimeslot = findAvailableTimeslot(courseA, timetable);
    if (newTimeslot !== null) {
      rescheduleCourse(courseA, newTimeslot, timetable);
    } else {
      const newRoom = findAvailableRoom(courseA, timetable);
      if (newRoom !== null) {
        moveCourseToNewRoom(courseA, newRoom, timetable);
      } else {
        console.log(`Couldn't resolve conflict for ${courseA.name}`);
      }
    }
  }
}

// Function to reschedule a course to a new timeslot
function rescheduleCourse(course, newTimeslot, timetable) {
  const { day, timeslot } = course;
  timetable[day][timeslot] = null; // Clear the original slot
  timetable[day][newTimeslot] = course;  // Assign to the new slot
  course.timeslot = newTimeslot; // Update the course timeslot
  console.log(`Rescheduled ${course.name} to ${day}, Timeslot ${newTimeslot}`);
}

// Function to move a course to a new room
function moveCourseToNewRoom(course, newRoom, timetable) {
  const { day, timeslot } = course;
  timetable[day][timeslot][course.roomId] = null; // Clear the original room
  timetable[day][timeslot][newRoom] = course;  // Assign to the new room
  course.roomId = newRoom; // Update the course room
  console.log(`Moved ${course.name} to Room ${newRoom}`);
}

// Resolve Unscheduled Courses
function resolveUnscheduledCourses(timetable) {
  const unscheduledCourses = findUnscheduledCourses(timetable);

  for (const course of unscheduledCourses) {
    const newTimeslot = findAvailableTimeslot(course, timetable);
    if (newTimeslot !== null) {
      scheduleCourse(course, newTimeslot, timetable);
    } else {
      console.log(`Couldn't schedule ${course.name}`);
    }
  }
}

// Function to schedule an unscheduled course to a new timeslot
function scheduleCourse(course, newTimeslot, timetable) {
  const { day } = course;
  timetable[day][newTimeslot] = [course]; // Assign to the new slot
  course.timeslot = newTimeslot; // Update the course timeslot
  console.log(`Scheduled ${course.name} to ${day}, Timeslot ${newTimeslot}`);
}

// Additional Adjustments
function applyAdditionalAdjustments(timetable, lecturers) {
  optimizeRoomUsage(timetable);
  balanceWorkloads(timetable, lecturers);
  // Apply other adjustments if needed
  // ...
}

// Optimize Room Usage
function optimizeRoomUsage(timetable) {
  const groupedCourses = groupCoursesBySubject(timetable);
  
  for (const subjectCourses of groupedCourses) {
    const rooms = {}; // Track available rooms for each subject

    for (const course of subjectCourses) {
      const { day, timeslot } = course;
      const roomAvailability = timetable[day][timeslot];

      for (const roomId in roomAvailability) {
        if (!roomAvailability[roomId]) {
          if (!rooms[course.subject]) {
            rooms[course.subject] = [];
          }
          rooms[course.subject].push(roomId);
        }
      }
    }

    for (const course of subjectCourses) {
      const { day, timeslot, subject } = course;
      if (rooms[subject] && rooms[subject].length > 0) {
        const roomIndex = rooms[subject].shift();
        timetable[day][timeslot][roomIndex] = course;
        course.roomId = roomIndex; // Update the course room
        console.log(`Optimized ${course.name} to Room ${roomIndex}`);
      }
    }
  }
}

// Function to group courses by subject
function groupCoursesBySubject(timetable) {
  const groupedCourses = {};

  for (const day of timetable) {
    for (const timeslot of day) {
      for (const course of timeslot) {
        if (!groupedCourses[course.subject]) {
          groupedCourses[course.subject] = [];
        }
        groupedCourses[course.subject].push(course);
      }
    }
  }

  return Object.values(groupedCourses);
}

// Balance Workloads
function balanceWorkloads(timetable, lecturers) {
  for (const lecturer of lecturers) {
    const lecturerCourses = findLecturerCourses(timetable, lecturer.id);

    let prevCourseEndTime = null;

    for (let dayIndex = 0; dayIndex < timetable.length; dayIndex++) {
      const day = timetable[dayIndex];

      for (let timeslotIndex = 0; timeslotIndex < day.length; timeslotIndex++) {
        const timeslot = day[timeslotIndex];

        const currentCourse = timeslot.find(course => course && course.lecturerId === lecturer.id);

        if (currentCourse) {
          if (prevCourseEndTime !== null) {
            const gapDuration = currentCourse.startTime - prevCourseEndTime;

            // Check for excessive gaps
            if (gapDuration > MAX_GAP_DURATION) {
              const gap = {
                name: 'Gap',
                lecturerId: lecturer.id,
                roomId: null,
                startTime: prevCourseEndTime,
                endTime: currentCourse.startTime,
                subject: 'Gap',
                day: dayIndex,
                timeslot: timeslotIndex,
              };
              timeslot.splice(timeslot.indexOf(currentCourse), 0, gap);
              console.log(`Inserted gap for ${lecturer.name} on ${getDayName(dayIndex)}, Timeslot ${timeslotIndex}`);
            }
          }

          prevCourseEndTime = currentCourse.endTime;
        } else {
          prevCourseEndTime = null;
        }
      }
    }
  }
}

// Function to find lecturer courses
function findLecturerCourses(timetable, lecturerId) {
  const lecturerCourses = [];

  for (const day of timetable) {
    for (const timeslot of day) {
      const course = timeslot.find(course => course && course.lecturerId === lecturerId);
      if (course) {
        lecturerCourses.push(course);
      }
    }
  }

  return lecturerCourses;
}

// Function to get day name
function getDayName(dayIndex) {
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  return days[dayIndex];
}


// Main function to adjust the timetable
function adjustTimetable(timetable, lecturers) {
  resolveCourseConflicts(timetable);
  resolveUnscheduledCourses(timetable);
  applyAdditionalAdjustments(timetable, lecturers);
  console.log("Timetable adjustments complete.");
}

// Function to resolve course conflicts
function resolveCourseConflicts(timetable) {
  const conflicts = findCourseConflicts(timetable);

  for (const conflict of conflicts) {
    const { courseA, courseB } = conflict;

    // Attempt to reschedule one of the conflicting courses to a different timeslot
    const newTimeslot = findAvailableTimeslot(courseA, timetable);
    if (newTimeslot !== null) {
      timetable[courseA.day][courseA.timeslot] = null; // Clear the original slot
      timetable[courseA.day][newTimeslot] = courseA; // Assign to the new slot
      console.log(`Rescheduled ${courseA.name} to ${getDayName(courseA.day)}, Timeslot ${newTimeslot}`);
    } else {
      console.log(`Couldn't resolve conflict for ${courseA.name}`);
    }
  }
}

// Function to find conflicts where multiple courses are scheduled in the same timeslot or room
function findCourseConflicts(timetable) {
  const conflicts = [];

  for (let day = 0; day < timetable.length; day++) {
    for (let timeslot = 0; timeslot < timetable[day].length; timeslot++) {
      const timeslotCourses = timetable[day][timeslot].filter(course => course !== null);

      if (timeslotCourses.length > 1) {
        conflicts.push({ courseA: timeslotCourses[0], courseB: timeslotCourses[1] });
      }
    }
  }

  return conflicts;
}

// Function to find an available timeslot for rescheduling
function findAvailableTimeslot(course, timetable) {
  const availableTimeslots = [];

  for (let timeslot = 0; timeslot < timetable[course.day].length; timeslot++) {
    if (timetable[course.day][timeslot] === null) {
      availableTimeslots.push(timeslot);
    }
  }

  return availableTimeslots.length > 0 ? availableTimeslots[0] : null;
}

// Function to resolve unscheduled courses
function resolveUnscheduledCourses(timetable) {
  const unscheduledCourses = findUnscheduledCourses(timetable);

  for (const course of unscheduledCourses) {
    const newTimeslot = findAvailableTimeslot(course, timetable);
    if (newTimeslot !== null) {
      timetable[course.day][newTimeslot] = course;
      console.log(`Scheduled ${course.name} to ${getDayName(course.day)}, Timeslot ${newTimeslot}`);
    } else {
      console.log(`Couldn't schedule ${course.name}`);
    }
  }
}

// Function to find unscheduled courses that need to be rescheduled
function findUnscheduledCourses(timetable) {
  const unscheduledCourses = [];

  for (let day = 0; day < timetable.length; day++) {
    for (let timeslot = 0; timeslot < timetable[day].length; timeslot++) {
      if (timetable[day][timeslot].length === 0) {
        unscheduledCourses.push({
          name: 'Unscheduled Course',
          day,
          timeslot,
          // Other properties...
        });
      }
    }
  }

  return unscheduledCourses;
}

// Function to get day name
function getDayName(dayIndex) {
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  return days[dayIndex];
}



// Timetable export
// Function to export the timetable to a CSV file
function exportTimetableToCSV(timetable, filePath) {
  const csvContent = generateCSVContent(timetable);
  
  fs.writeFileSync(filePath, csvContent, 'utf-8');
  
  console.log('Timetable exported to CSV:', filePath);
}

// Function to generate CSV content from the timetable
function generateCSVContent(timetable) {
  let csvContent = 'Day,Timeslot,Room,Course,Lecturer\n';

  for (let day = 0; day < timetable.length; day++) {
    for (let timeslot = 0; timeslot < timetable[day].length; timeslot++) {
      const course = timetable[day][timeslot];

      if (course) {
        const roomName = course.room ? course.room.name : 'Unscheduled';
        const lecturerName = course.lecturer ? course.lecturer.name : 'Unassigned';
        
        csvContent += `${getDayName(day)},${timeslot},${roomName},${course.name},${lecturerName}\n`;
      }
    }
  }

  return csvContent;
}

// Function to get day name
function getDayName(dayIndex) {
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  return days[dayIndex];
}

// Usage
const filePath = 'timetable.csv'; // Specify the desired file path
exportTimetableToCSV(generatedTimetable, filePath);


    // Apply CSP algorithm
    solveCSP();

    // Other functionalities
    // ...

  } catch (error) {
    console.error('An error occurred:', error);
  }
}

// Run the application
startApp();
