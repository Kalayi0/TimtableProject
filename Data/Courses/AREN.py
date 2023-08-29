import pandas as pd
from pandas.io.excel import ExcelWriter


data = {
    "Level 100 – Semester 1": {
        "Course Code": ["FAEN 101", "FAEN 103", "FAEN 107", "FAEN 109", "AREN 101", "UGRC 110"],
        "Course Title": ["Algebra", "Basic Mechanics I", "General Chemistry", "General Physics", "Engineering Graphics", "Academic Writing I"],
        "Core/Elective": ["C", "C", "C", "C", "C", "C"],
        "Total (Credits)": [4, 3, 3, 3, 3, 3]
    },
    "Level 200 – Semester 1": {
        "Course Code": ["FAEN 201", "FAEN 203", "FAEN 205", "AREN 201", "AREN 203/CROP 221", "UGRC 130"],
        "Course Title": ["Calculus II", "Strength of Materials", "Thermodynamics", "Engineering Surveying", "Introduction to Crop Production", "Understanding Human Societies"],
        "Core/Elective": ["C", "C", "C", "C", "C", "C"],
        "Total (Credits)": [4, 3, 3, 3, 2, 3]
    },
    "Level 300 – Semester 1": {
        "Course Code": ["FAEN 301", "AREN 301", "AREN 303", "AREN 305", "AREN 307", "AREN 309"],
        "Course Title": ["Numerical Methods", "Soil and Crop Mechanics Application to Mechanization", "Animal Production", "Heat Transfer", "Farm Structures & Environ. Engineering", "Soil and Water Engineering"],
        "Core/Elective": ["C", "C", "E", "C", "C", "C"],
        "Total (Credits)": [3, 3, 3, 3, 3, 3]
    },
    "Level 400 – Semester 1": {
        "Course Code": ["AREN 400", "AREN 401", "AREN 403", "AREN 405", "FPEN 409", "FAEN 401"],
        "Course Title": ["Project", "Farm Machine Design", "Rural Engineering", "Maintenance and Management of Agricultural Machinery", "Engineering and Design of Food Process III (Plant Products)", "Law for Engineers"],
        "Core/Elective": ["C", "C", "C", "C", "E", "C"],
        "Total (Credits)": [3, 3, 3, 3, 3, 3]
    },
    "Level 100 – Semester 2": {
        "Course Code": ["FAEN 102", "FAEN 104", "FAEN 106", "FAEN 108", "AREN 102", "AREN 104", "UGRC 150"],
        "Course Title": ["Calculus I", "Basic Mechanics II", "Applied Electricity", "Basic Electronics", "Engineering Drawing", "Internship (Industrial Practice I)", "Critical Thinking and Practical Reasoning"],
        "Core/Elective": ["C", "C", "C", "C", "C", "C", "C"],
        "Total (Credits)": [4, 3, 3, 3, 2, 1, 3]
    },
    "Level 200 – Semester 2": {
        "Course Code": ["FAEN 202", "FAEN 204", "FAEN 206", "AREN 202", "AREN 204", "AREN 206", "UGRC 220-238"],
        "Course Title": ["Differential Equations", "Fluid Mechanics", "Technical Report Writing (Academic Writing II)", "Physical and Engineering Properties of Biological Materials", "Internship (Industrial Practice II)", "Introduction to African Studies", "Understanding Human Societies"],
        "Core/Elective": ["C", "C", "C", "C", "E", "C", "C"],
        "Total (Credits)": [4, 3, 3, 3, 0, 3, 3]
    },
    "Level 300 – Semester 2": {
        "Course Code": ["FAEN 302", "AREN 302", "AREN 304", "AREN 306", "AREN 308", "AREN 312", "AREN 314"],
        "Course Title": ["Statistics for Engineers", "Agricultural Materials Handling", "Soil Mechanics", "Hydrology and Water Resources Management", "Agricultural Machinery Technology", "Energy and Power Utilization on Farms", "Internship (Industrial Practice III)"],
        "Core/Elective": ["C", "C", "C", "C", "C", "C", "C"],
        "Total (Credits)": [3, 3, 3, 3, 3, 2, 1]
    },
    "Level 400 – Semester 2": {
        "Course Code": ["FAEN 402", "AREN 400", "AREN 402", "AREN 404", "AREN 406", "AREN 408", "FAEN 402"],
        "Course Title": ["Principles of Management and Entrepreneurship", "Project", "Technology of Tractor and Implement", "Irrigation and Drainage Engineering", "Storage of Agricultural Produce and cold chain mgt", "Agro-Meteorology and Climatology", "Principles of Management and Entrepreneurship"],
        "Core/Elective": ["C", "C", "C", "C", "C", "C", "C"],
        "Total (Credits)": [3, 3, 3, 3, 3, 3, 3]
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
