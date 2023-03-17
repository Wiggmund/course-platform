
interface HashTagProps {
    text: string;
}

export const HashTag = ({text}: HashTagProps) => {
    return <span>#{text}</span>
};