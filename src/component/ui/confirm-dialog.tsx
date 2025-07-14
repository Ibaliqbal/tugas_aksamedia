import { Modal } from "../modal";
import { Button } from "./button";

type ConfirmDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  loading?: boolean;
};

export const ConfirmDialog = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = "Delete",
  cancelText = "Cancel",
  loading = false,
}: ConfirmDialogProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} size="sm">
      <div className="space-y-4">
        <p className="text-gray-600">{message}</p>

        <div className="flex gap-3 pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            disabled={loading}
            className="flex-1 bg-transparent"
          >
            {cancelText}
          </Button>
          <Button
            type="button"
            variant="primary"
            onClick={onConfirm}
            loading={loading}
            disabled={loading}
            className="flex-1 bg-red-600 hover:bg-red-700 focus:ring-red-500"
          >
            {loading ? "Deleting..." : confirmText}
          </Button>
        </div>
      </div>
    </Modal>
  );
};
