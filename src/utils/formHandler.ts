export function getFormData<T>(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    let data: T = {} as T
    for (let ear of e.target as any) {
        switch (ear?.type) {
            case 'number':
                data[ear?.id as keyof T] = Number(ear?.value) as any
                break;
            case 'checkbox':
                data[ear?.id as keyof T] = ear?.checked
                break;
            case 'file':
                data[ear?.id as keyof T] = ear?.files[0]
                break;
            case 'select-one':
                data[ear?.id as keyof T] = {
                    value: ear?.options[ear?.selectedIndex].value,
                    id: ear?.options[ear?.selectedIndex].id,
                } as any
                break;
            default: data[ear?.id as keyof T] = ear?.value
        }
    }

    return data
}
