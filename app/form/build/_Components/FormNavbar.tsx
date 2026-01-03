// components/FormNavbar.tsx
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  FormInput,
  ChevronRight,
  Settings2Icon,
  EyeIcon,
  PencilIcon,
} from "lucide-react";
import { useRouter } from "next/navigation";

interface FormNavbarProps {
  formName: string;
  onFormNameClick: () => void;
  onPublish: () => void;
  onDesignClick: () => void;
  onSettingClick: () => void;
}

export const FormNavbar = ({
  formName,
  onFormNameClick,
  onPublish,
  onDesignClick,
  onSettingClick,
}: FormNavbarProps) => {
  const router = useRouter();

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background">
      <header className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-3 min-w-0">
          <FormInput className="h-5 w-5 shrink-0" />
          <span className="hidden font-medium">Form Builder</span>
          <ChevronRight className="hidden sm:block h-4 w-4 text-muted-foreground" />
          <Input
            className="border-0 bg-transparent p-0 text-xl font-semibold focus-visible:ring-0 truncate"
            value="Create New Form"
            readOnly
          />
        </div>
        <div className="flex gap-2 items-center">
          <Button className="cursor-pointer bg-green-800" onClick={onPublish}>
            Publish
          </Button>
          <Settings2Icon
            onClick={onSettingClick}
            className="cursor-pointer"
            size={20}
          />
          <EyeIcon
            onClick={() => router.push("/form/preview")}
            className="cursor-pointer"
            size={20}
          />
          <PencilIcon
            onClick={onDesignClick}
            className="cursor-pointer"
            size={20}
          />
        </div>
      </header>
    </nav>
  );
};
