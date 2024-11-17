export const savedTheme = ()=>localStorage.getItem('theme') || 'system';
export const applyTheme=(selectedTheme)=>{
    const root = window.document.documentElement;
    if (selectedTheme === 'dark') {
        root.classList.add('dark');
    } else if (selectedTheme === 'light') {
        root.classList.remove('dark');
    } else {     
        window.matchMedia('(prefers-color-scheme: dark)').matches 
        ?  root.classList.add('dark')
        :  root.classList.remove('dark');
    }
    localStorage.setItem('theme', selectedTheme)
}