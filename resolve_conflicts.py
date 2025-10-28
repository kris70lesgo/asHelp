import sys

def resolve_conflicts(filename):
    with open(filename, 'r', encoding='utf-8') as f:
        lines = f.readlines()
    
    result = []
    in_conflict = False
    keep_section = True
    
    for line in lines:
        if line.startswith('<<<<<<<'):
            in_conflict = True
            keep_section = True
            continue
        elif line.startswith('======='):
            keep_section = False
            continue
        elif line.startswith('>>>>>>>'):
            in_conflict = False
            keep_section = True
            continue
        
        if not in_conflict or keep_section:
            result.append(line)
    
    with open(filename, 'w', encoding='utf-8') as f:
        f.writelines(result)
    
    print(f"Resolved conflicts in {filename}")

if __name__ == '__main__':
    resolve_conflicts('src/app/ai-generator/page.tsx')
    resolve_conflicts('src/app/api/generate-assignment/route.ts')
