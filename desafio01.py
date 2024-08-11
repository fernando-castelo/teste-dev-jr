import pandas as pd

def txt_to_dataframe(txt_file):
    with open(txt_file, 'r') as file:
        lines = file.readlines()
    
    data = []

    for line in lines:

        line = line.strip()
    
        fields = line.split('|')
    
        cleaned_fields = [field.strip() for field in fields]
        
        data.append(cleaned_fields)
    
    df = pd.DataFrame(data[1:], columns=data[0])
    
    return df

def save_to_excel(df, excel_file):
    df.to_excel(excel_file, index=False, engine='openpyxl')

txt_file = 'arquivo.txt'
excel_file = 'arquivo_convertido.xlsx' 

df = txt_to_dataframe(txt_file)

save_to_excel(df, excel_file)

