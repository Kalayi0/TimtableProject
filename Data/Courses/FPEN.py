import pandas as pd

# Define course data for Food Process Engineering
data = {
    "Level 100 – Semester 1": {
        "Course Code": ["FAEN 101", "FAEN 107", "FAEN 109", "FAEN 105", "FAEN 103", "UGRC 110"],
        "Course Title": ["Algebra", "General Chemistry", "General Physics", "Engineering Drawing with CAD", "Basic Mechanics I", "Academic Writing I"],
        "Core/Elective": ["C", "C", "C", "C", "C", "C"],
        "Credits": [4, 3, 3, 3, 3, 3]
    },
    "Level 100 – Semester 2": {
        "Course Code": ["FAEN 102", "FAEN 104", "FAEN 106", "FAEN 108", "FAEN 112", "UGRC 150"],
        "Course Title": ["Calculus I", "Basic Mechanics II", "Applied Electricity", "Basic Electronics", "C Programming", "Critical Thinking and Practical Reasoning"],
        "Core/Elective": ["C", "C", "C", "C", "C", "C"],
        "Credits": [4, 2, 3, 3, 3, 3]
    },
    "Level 200 – Semester 1": {
        "Course Code": ["FAEN 201", "FAEN 203", "FAEN 205", "FPEN 201", "CPEN 101", "UGRC 220-238"],
        "Course Title": ["Calculus II", "Strength of Materials", "Thermodynamics", "Introduction to Food Process Engineering", "Engineering Computational Tools", "Introduction to African Studies"],
        "Core/Elective": ["C", "C", "C", "C", "C", "C"],
        "Credits": [4, 3, 3, 2, 2, 3]
    },
    "Level 200 – Semester 2": {
        "Course Code": ["FAEN 202", "FAEN 204", "FAEN 206", "FPEN 202", "FPEN 204", "FPEN 222", "UGRC 131-136"],
        "Course Title": ["Differential Equations", "Fluid Mechanics", "Technical Report Writing", "Food Process Engineering Calculations", "Physical and Chemical Properties of Food", "Internship (Industrial Practice II)", "Understanding Human Societies"],
        "Core/Elective": ["C", "C", "C", "C", "C", "E", "C"],
        "Credits": [4, 3, 3, 2, 3, 0, 3]
    },
    "Level 300 – Semester 1": {
        "Course Code": ["FAEN 301", "FPEN 301", "FPEN 303", "FPEN 305", "FPEN 307", "FPEN 309", "FPEN 311"],
        "Course Title": ["Numerical Methods", "Heat Transfer", "Thermodynamics II", "Engineering & Design of Food Process I", "Introduction to Food Microbiology", "Process/Product Development in Food Processing", "Introduction to Biotechnology"],
        "Core/Elective": ["C", "C", "C", "C", "C", "C", "C"],
        "Credits": [3, 2, 2, 3, 3, 3, 2]
    },
    "Level 300 – Semester 2": {
        "Course Code": ["FAEN 302", "FPEN 302", "FPEN 304", "FPEN 306", "FPEN 308", "FPEN 312", "FPEN 322", "FPEN 314"],
        "Course Title": ["Statistics for Engineers", "Separation Processes", "Engineering & Design of Food Process II", "Chemical Reaction Engineering", "Environmental Engineering in Food Processing", "Mass Transfer", "Internship", "Rheological and Sensory Properties of Food"],
        "Core/Elective": ["C", "C", "C", "C", "C", "C", "C", "C"],
        "Credits": [3, 2, 3, 2, 3, 2, 1, 2]
    },
    "Level 400 – Semester 1": {
        "Course Code": ["FAEN 401", "FPEN 400", "FPEN 401", "FPEN 405", "FPEN 403", "FPEN 407", "FPEN 409", "FPEN 411", "FPEN 420"],
        "Course Title": ["Law for Engineers", "Independent Engineering Study (Capstone Engineering Design)", "Food Plant Design & Economics", "Engineering and Design of Food Process III (Plant Products)", "Engineering Design", "Statistical Quality Control in Food Processing", "Safety in Food Plants", "Professional Development Seminar", "Research Project"],
        "Core/Elective": ["C", "C", "C", "C", "C", "C", "C", "C", "C"],
        "Credits": [3, 3, 3, 3, 2, 2, 2, 2, 2]
    },
    "Level 400 – Semester 2": {
        "Course Code": ["FAEN 402", "FPEN 400", "FPEN 402", "FPEN 404", "FPEN 406", "FPEN 408", "FPEN 420", "FOSC 402"],
        "Course Title": ["Principles of Management and Entrepreneurship", "Independent Engineering Study (Capstone Engineering Design)", "Engineering and Design of Food Process IV (Animal Products)", "Food Process Control", "Food Packaging", "Microbiological Applications in Food Processing", "Research Project", "Food Processing Plant Operations and Sanitation"],
        "Core/Elective": ["C", "C", "C", "C", "C", "C", "C", "C"],
        "Credits": [3, 3, 3, 3, 2, 2, 2, 2]
    },
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

