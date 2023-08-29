import pandas as pd

data = {
    "Level 100 – Semester I": {
        "Course Code": ["FAEN 101", "FAEN 103", "FAEN 105", "FAEN 109", "CPEN 101", "UGRC 110"],
        "Course Title": ["Algebra", "Basic Mechanics I", "Engineering Drawing with CAD", "General Physics", "Engineering Computational Tools", "Academic Writing I"],
        "Credits": [4, 3, 3, 3, 2, 3],
        "Core/Elective": ["C", "C", "C", "C", "C", "C"]
    },
    "Level 100– Semester II": {
        "Course Code": ["FAEN 102", "FAEN 106", "FAEN 108", "FAEN 112", "CPEN 102", "UGRC 150"],
        "Course Title": ["Calculus I", "Applied Electricity", "Basic Electronics", "C Programming", "Introduction to Database Systems", "Critical Thinking and Practical Reasoning"],
        "Credits": [4, 3, 3, 2, 3, 3],
        "Core/Elective": ["C", "C", "C", "C", "C", "C"]
    },
    "Level 200 – Semester I": {
        "Course Code": ["FAEN 201", "CPEN 201", "CPEN 203", "CPEN 205", "CPEN 207", "UGRC220-238"],
        "Course Title": ["Calculus II", "C++ Programming", "Digital Circuits", "Discrete Mathematical Structures", "Introduction to Software Engineering", "Introduction to African Studies"],
        "Credits": [4, 3, 3, 2, 3, 3],
        "Core/Elective": ["C", "C", "C", "C", "C", "C"]
    },
    "Level 200 – Semester II": {
        "Course Code": ["FAEN 202", "FAEN 206", "CPEN 202", "CPEN 204", "CPEN 206", "UGRC 131-136"],
        "Course Title": ["Differential Equations", "Technical Report Writing", "Computer Systems Design", "Data Structures and Algorithms", "Linear Circuits", "Understanding Human Societies"],
        "Credits": [4, 3, 2, 3, 3, 3],
        "Core/Elective": ["C", "C", "C", "C", "C", "C"]
    },
    "Level 300 – Semester I": {
        "Course Code": ["FAEN 301", "CPEN 301", "CPEN 303", "CPEN 305", "CPEN 307", "CPEN 309"],
        "Course Title": ["Numerical Methods", "Signals and Systems", "Computer Architecture", "Computer Networks", "Operating Systems", "Programming Language Fundamentals"],
        "Credits": [3, 3, 3, 3, 3, 3],
        "Core/Elective": ["C", "C", "C", "C", "C", "C"]
    },
    "Level 300 – Semester II": {
        "Course Code": ["FAEN 302", "CPEN 302", "CPEN 304", "CPEN 306", "CPEN 308", "CPEN 312", "CPEN 314"],
        "Course Title": ["Statistics for Engineers", "Computer Systems Engineering", "Digital Signal Processing", "Microelectronic Devices and Circuits", "Fundamentals of Information Transmission", "Object Oriented Programming with Java", "Industrial Practice"],
        "Credits": [3, 3, 3, 3, 2, 3, 1],
        "Core/Elective": ["C", "C", "C", "C", "C", "C", "C"]
    },
    "Level 400 – Semester I": {
        "Course Code": ["FAEN 401", "CPEN 400", "CPEN 401", "CPEN 403", "CPEN 405", "CPEN 407", "CPEN 409", "CPEN 411", "CPEN 413", "CPEN 415", "CPEN 417"],
        "Course Title": ["Law for Engineers", "Independent Project", "Control Systems Analysis and Design", "Embedded Systems", "Artificial Intelligence", "Software Systems", "Software Engineering", "Computer Graphics", "Hardware Systems", "VLSI Systems Design", "Microprocessor Systems and Integration"],
        "Credits": [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
        "Core/Elective": ["C", "C", "C", "C", "C", "E", "E", "E", "B", "B", "B"]
    },
    "Level 400– Semester II": {
        "Course Code": ["FAEN 402", "CPEN 400", "CPEN 402", "CPEN 404", "CPEN 406", "CPEN 408", "CPEN 412", "CPEN 414", "CPEN 416", "CPEN 418", "CPEN 422"],
        "Course Title": ["Principles of Management and Entrepreneurship", "Independent Project", "Advanced Computer Architecture", "Computer Vision and Robotics", "Wireless Communication Systems", "Human Computer Interface", "Web Software Architecture", "DSP System Implementation", "Integrated Circuit for Communication", "Security in Computer Systems", "Multimedia Systems"],
        "Credits": [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
        "Core/Elective": ["C", "C", "C", "C", "C", "A2", "A2", "B2", "B2", "C2", "C2"]
    }
    # ... Add data for other levels and semesters similarly ...
}

# Loop through each level and semester, and create Excel files
for level_semester, course_data in data.items():
    # Create a DataFrame for the course data
    df = pd.DataFrame(course_data)
    
    # Create an Excel writer using XlsxWriter as the engine
    excel_writer = pd.ExcelWriter(f'{level_semester}_courses.xlsx', engine='xlsxwriter')
    
    # Write the DataFrame to the Excel sheet
    df.to_excel(excel_writer, sheet_name='Courses', index=False)
    
    # Save the Excel file
    excel_writer.close()
    
    print(f"{level_semester} course data saved to {level_semester}_courses.xlsx")

