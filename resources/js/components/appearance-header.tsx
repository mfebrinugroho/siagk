import { useAppearance } from '@/hooks/use-appearance';
import { Moon, Sun } from 'lucide-react';

const AppearanceHeader = () => {
    const { appearance, updateAppearance } = useAppearance();

    const toggleTheme = () => {
        updateAppearance(appearance === 'dark' ? 'light' : 'dark');
    };

    return (
        <button onClick={toggleTheme} className="hover:bg-accent cursor-pointer rounded-md p-2">
            {appearance === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </button>
    );
};

export default AppearanceHeader;
