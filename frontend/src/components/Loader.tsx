import { Loader2 } from 'lucide-react';

export default function Loader() {
   return (
      <div className="flex items-center justify-center h-96">
        <Loader2 className="w-6 h-6 animate-spin" />
      </div>
    );
}
