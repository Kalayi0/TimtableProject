import pandas as pd

# Define course data for Materials Engineering
data = {
    "Level 100 - Semester I": {
        "Course Code": ["FAEN 102", "FAEN 104", "FAEN 106", "FAEN 108", "FAEN 112", "MTEN 102", "UGRC 150"],
        "Course Title": ["Calculus I", "Basic Mechanics II", "Applied Electricity", "Basic Electronics", "C Programming", "Internship", "Critical Thinking and Practical Reasoning"],
        "Core/Elective": ["C", "C", "C", "C", "E", "E", "C"],
        "Credits": [4, 2, 3, 3, 2, 1, 3]
    },
    "Level 100 - Semester II": {
        "Course Code": ["FAEN 101", "FAEN 103", "FAEN 105", "FAEN 107", "FAEN 109", "UGRC 110"],
        "Course Title": ["Algebra", "Basic Mechanics I", "Engineering Drawing with CAD", "General Chemistry", "General Physics", "Academic Writing I"],
        "Core/Elective": ["C", "C", "C", "C", "C", "C"],
        "Credits": [4, 3, 3, 3, 3, 3]
    },
    "Level 200 Courses- Semester I": {
        "Course Code": ["FAEN 201", "FAEN 203", "FAEN 205", "UGRC 207", "CPEN 101", "MTEN 201"],
        "Course Title": ["Calculus II", "Strength of Materials", "Thermodynamics", "Understanding Human Societies", "Engineering Computational Tools", "Fundamentals of Materials Sci. & Engineering"],
        "Core/Elective": ["C", "C", "C", "C", "C", "C"],
        "Credits": [4, 3, 3, 3, 2, 3]
    },
    "Level 200 Courses- Semester II": {
        "Course Code": ["FAEN 101", "FAEN 103", "FAEN 105", "MTEN 202", "MTEN 204", "MTEN 206", "UGRC 220-238"],
        "Course Title": ["Algebra", "Basic Mechanics I", "Engineering Drawing with CAD", "Kinetic Processes and Surface Phenomenon", "Thermodynamics of Materials", "Internship", "Introduction to African Studies"],
        "Core/Elective": ["C", "C", "C", "C", "C", "E", "C"],
        "Credits": [4, 3, 3, 2, 2, 0, 3]
    },
    "Level 300 Courses- Semester I": {
        "Course Code": ["FAEN 301", "MTEN 301", "MTEN 303", "MTEN 305", "MTEN 307", "MTEN 309", "MTEN 311", "MTEN 313"],
        "Course Title": ["Numerical Methods", "Materials Laboratory I", "Introduction to Materials Processing", "Mechanical Behaviour of Materials", "Phase Equilibria of Materials", "Materials Analyses Techniques", "Solid State Technology", "Electrical, Magnetic & Optical Properties of Materials"],
        "Core/Elective": ["C", "C", "C", "C", "C", "C", "C", "C"],
        "Credits": [3, 1, 2, 2, 2, 3, 3, 3]
    },
    "Level 300 Courses- Semester II": {
        "Course Code": ["FAEN 302", "MTEN 302", "MTEN 304", "MTEN 306", "MTEN 308", "MTEN 312", "MTEN 314", "MTEN 316", "MTEN 318", "MTEN 322", "MTEN 324", "MTEN 326", "MTEN 328"],
        "Course Title": ["Statistics for Engineers", "Internship III", "Computational Materials Science", "Materials Laboratory II", "Heat and Mass Transfer", "Crystal Chemistry of Ceramics", "Ceramic Processing Principle", "Engineering Ceramics I", "Principles of Extractive Metallurgy", "Physical Metallurgy", "Metal Joining Technology (Welding)", "Organic Chemistry of Polymers", "Polymer Processing Tech I", "Physical Properties of Polymers"],
        "Core/Elective": ["C", "C", "C", "C", "C", "E", "E", "E", "E", "E", "E", "E", "E", "E"],
        "Credits": [3, 1, 2, 1, 3, 3, 3, 2, 3, 3, 2, 3, 3, 2]
    },
    "Level 400 Courses- Semester I": {
        "Course Code": ["FAEN 402", "MTEN 400", "MTEN 402", "MTEN 404", "MTEN 408", "MTEN 412", "MTEN 414", "MTEN 416"],
        "Course Title": ["Principles of Management & Entrepreneurship", "Project", "Non-Destructive Evaluation and Failure", "Project Management", "Professional Development Seminar", "Materials Selection & Design", "Environmental Engineering & Waste Management", "Corrosion & Corrosion Control"],
        "Core/Elective": ["C", "C", "C", "C", "C", "C", "C", "C"],
        "Credits": [3, 6, 2, 2, 1, 2, 3, 2]
    },
    "Level 400 Courses- Semester II": {
        "Course Code": ["FAEN 401", "MTEN 400", "MTEN 401", "MTEN 403", "MTEN 405", "MTEN 407", "MTEN 409", "MTEN 411", "MTEN 413", "MTEN 415", "MTEN 417"],
        "Course Title": ["Law for Engineers", "Project", "Composite Design and Fabrication", "Refractories", "Process & Quality Control", "Engineering Ceramics II", "Glasses, Cements and Concretes", "Physical Metallurgy II", "Foundry Technology", "Biodegradable Polymer & Fibrous Materials", "Polymer Processing & Technology II"],
        "Core/Elective": ["C", "C", "C", "C", "C", "E", "E", "E", "E", "E", "E"],
        "Credits": [3, 3, 3, 2, 3, 2, 2, 2, 2, 2, 2]
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

