# static_analysis.py
import ast

def check_syntax(code: str):
    """
    Returns None if no syntax error is found.
    Otherwise, returns a string with the error message.
    """
    try:
        ast.parse(code)
        return None
    except SyntaxError as e:
        return f"Syntax error: {e.msg} at line {e.lineno} col {e.offset}"

if __name__ == "__main__":
    sample_code = "print('Hello World'\n"  # intentionally broken code
    error = check_syntax(sample_code)
    if error:
        print(error)
    else:
        print("No syntax errors found!")
