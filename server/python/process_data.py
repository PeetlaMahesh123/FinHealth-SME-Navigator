import sys
import pandas as pd
import json

# Example: Read CSV or JSON from stdin, process, and output result

def main():
    try:
        input_data = json.load(sys.stdin)
        # Example: assume input_data is a list of dicts
        df = pd.DataFrame(input_data)
        # Example processing: describe numeric columns
        summary = df.describe(include='all').to_dict()
        print(json.dumps({'summary': summary}))
    except Exception as e:
        print(json.dumps({'error': str(e)}))
        sys.exit(1)

if __name__ == '__main__':
    main()
