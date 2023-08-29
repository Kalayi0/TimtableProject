import pandas as pd

data = {
    "Level 100 – Semester I": {
        "Course Code": ["FAEN 101", "FAEN 103", "FAEN 105", "FAEN 109", "BMEN 101", "UGRC 110"],
        "Course Title": ["Algebra", "Basic Mechanics I", "Engineering Drawing with CAD", "General Physics", "Introduction to Biomedical Engineering", "Academic Writing I"],
        "Credits": [4, 3, 3, 3, 3, 3],
        "Core/Elective": ["C", "C", "C", "C", "C", "C"]
    },
    "Level 100– Semester II": {
        "Course Code": ["FAEN 102", "FAEN 106", "FAEN 108", "FAEN 112", "BMEN 102", "UGRC 150"],
        "Course Title": ["Calculus I", "Applied Electricity", "Basic Electronics", "C Programming", "Introduction to the Structure and Properties of Materials", "Critical Thinking and Practical Reasoning"],
        "Credits": [4, 3, 3, 2, 2, 3],
        "Core/Elective": ["C", "C", "C", "C", "C", "C"]
    },
    "Level 200 – Semester I": {
        "Course Code": ["FAEN 201", "BMEN 201", "BMEN 203", "BMEN 205", "BMEN 207", "UGRC220-238"],
        "Course Title": ["Calculus II", "Human Biology I (Anatomy)", "Bioinstrumentation", "Biomaterials", "Biomechanics", "Introduction to African Studies"],
        "Credits": [4, 2, 3, 3, 3, 3],
        "Core/Elective": ["C", "C", "C", "C", "C", "C"]
    },
    "Level 200 – Semester II": {
        "Course Code": ["FAEN 202", "FAEN 206", "BMEN 202", "BMEN 204", "BMEN 206", "UGRC 131-136"],
        "Course Title": ["Differential Equations", "Technical Report Writing", "Introduction to Biomedical Engineering", "Introduction to the Structure and Properties of Materials", "Linear Circuits", "Understanding Human Societies"],
        "Credits": [4, 3, 3, 2, 3, 3],
        "Core/Elective": ["C", "C", "C", "C", "C", "C"]
    },
     "Level 300 – Semester I": {
        "Course Code": ["FAEN 301", "BMEN 301", "BMEN 303", "BMEN 305", "BMEN 307", "BMEN 309"],
        "Course Title": ["Numerical Methods", "Human Biology I (Anatomy)", "Bioinstrumentation", "Biomaterials", "Biomechanics", "Research Methods"],
        "Credits": [3, 2, 3, 3, 3, 1],
        "Core/Elective": ["C", "C", "C", "C", "C", "C"]
     },
     "Level 300 – Semester II": {
        "Course Code": ["FAEN 302", "BMEN 302", "BMEN 304", "BMEN 306", "BMEN 308", "BMEN 312", "BMEN 314"],
        "Course Title": ["Statistics for Engineers", "Human Biology II (Physiology)", "Solution and Colloid Chemistry", "Design and Selection of Biomaterials", "Design of Mechanical Systems", "Medical Imaging", "Internship (Industrial Practice III)"],
        "Credits": [3, 2, 3, 3, 3, 3, 1],
        "Core/Elective": ["C", "C", "C", "C", "C", "C", "C"]
    },
    "Level 400 – Semester I": {
        "Course Code": ["FAEN 401", "BMEN 400", "BMEN 401", "BMEN 403", "BMEN 405", "BMEN 407", "BMEN 409"],
        "Course Title": ["Law for Engineers", "Project(Design/ Research)", "Engineering Principles of Human Physiology and Anatomy", "Cell and Molecular Biology", "Cardiovascular Mechanics", "Haemodynamics", "Local Issues in Biomedical Engineering"],
        "Credits": [3, 3, 2, 3, 2, 2, 3],
        "Core/Elective": ["C", "C", "C", "C", "C", "C", "C"]
    },
    "Level 400 – Semester II": {
        "Course Code": ["FAEN 402", "BMEN 400", "BMEN 402", "BMEN 404", "BMEN 406", "BMEN 408", "BMEN 412"],
        "Course Title": ["Principles of Management and Entrepreneurship", "Project (Design/ Research)", "Tissue Engineering and Biotechnology", "Biomedical Engineering Systems", "Transport Processes in Living Systems", "Professional Development Seminar", "Medical Physics"],
        "Credits": [3, 3, 3, 3, 2, 2, 2],
        "Core/Elective": ["C", "C", "C", "C", "C", "C", "C"]
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

