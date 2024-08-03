import { emitter } from '@/main';

const useToastMessage = (type: string, args: any): void => {
    emitter.emit(type, args);
};

export default useToastMessage;