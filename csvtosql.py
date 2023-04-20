import pandas as pd
import os

def csv_to_sql(input_file, output_file, table_name):
    df = pd.read_csv(input_file, sep=';', quotechar='"')

    with open(output_file, "w") as file:
        file.write(f"CREATE TABLE {table_name} (\n")
        file.write("id INT AUTO_INCREMENT PRIMARY KEY,\n")

        for column in df.columns:
            column_type = "VARCHAR(255)"  # Default type
            if df[column].dtype == 'int64':
                column_type = "INT"
            elif df[column].dtype == 'float64':
                column_type = "FLOAT"
            file.write(f"{column} {column_type},\n")

        file.write(");\n\n")

        for index, row in df.iterrows():
            values = []
            for value in row:
                if pd.isna(value):
                    values.append("NULL")
                elif isinstance(value, str):
                    values.append("'{}'".format(value.replace("'", "''")))
                else:
                    values.append(str(value))
            file.write(f"INSERT INTO {table_name} ({', '.join(df.columns)}) VALUES ({', '.join(values)});\n")


if __name__ == "__main__":
    input_file = "./zoubifichier.csv"
    output_file = "./zoubifichierpourbdd.sql"
    table_name = "ma_table"
    csv_to_sql(input_file, output_file, table_name)

