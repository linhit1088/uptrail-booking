'use client';

import React from 'react';
import styles from './ui.module.css';

// ==========================================
// BUTTON
// ==========================================

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  fullWidth?: boolean;
  children: React.ReactNode;
}

export function Button({
  variant = 'primary',
  size = 'md',
  loading = false,
  fullWidth = false,
  children,
  className = '',
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      className={`${styles.btn} ${styles[`btn-${variant}`]} ${styles[`btn-${size}`]} ${fullWidth ? styles['btn-full'] : ''} ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading && <span className={styles.spinner} />}
      {children}
    </button>
  );
}

// ==========================================
// SECTION TITLE
// ==========================================

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
}

export function SectionTitle({ title, subtitle, align = 'center' }: SectionTitleProps) {
  return (
    <div className={`${styles.sectionTitle} ${align === 'left' ? styles.sectionTitleLeft : ''}`}>
      <h2 className={styles.sectionTitleText}>{title}</h2>
      {subtitle && <p className={styles.sectionSubtitle}>{subtitle}</p>}
    </div>
  );
}

// ==========================================
// CARD
// ==========================================

interface CardProps {
  children: React.ReactNode;
  className?: string;
  interactive?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

export function Card({ children, className = '', interactive = false, padding = 'md' }: CardProps) {
  return (
    <div className={`card ${interactive ? 'card-interactive' : ''} ${styles[`card-pad-${padding}`]} ${className}`}>
      {children}
    </div>
  );
}

// ==========================================
// MODAL
// ==========================================

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
}

export function Modal({ isOpen, onClose, title, children, size = 'md' }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className={styles.modalBackdrop} onClick={onClose}>
      <div
        className={`${styles.modal} ${styles[`modal-${size}`]}`}
        onClick={(e) => e.stopPropagation()}
      >
        {title && (
          <div className={styles.modalHeader}>
            <h3 className={styles.modalTitle}>{title}</h3>
            <button className={styles.modalClose} onClick={onClose} aria-label="Đóng">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          </div>
        )}
        <div className={styles.modalBody}>{children}</div>
      </div>
    </div>
  );
}

// ==========================================
// INPUT GROUP
// ==========================================

interface InputGroupProps {
  label: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
}

export function InputGroup({ label, error, required, children }: InputGroupProps) {
  return (
    <div className={styles.inputGroup}>
      <label className={styles.inputLabel}>
        {label}
        {required && <span className={styles.inputRequired}>*</span>}
      </label>
      {children}
      {error && <p className={styles.inputError}>{error}</p>}
    </div>
  );
}

// ==========================================
// PROGRESS BAR
// ==========================================

interface ProgressBarProps {
  total: number;
  current: number;
  label?: string;
}

export function ProgressBar({ total, current, label }: ProgressBarProps) {
  const percent = Math.min((current / total) * 100, 100);
  const remaining = total - current;

  return (
    <div className={styles.progressWrap}>
      <div className={styles.progressTrack}>
        <div 
          className={styles.progressFill} 
          style={{ width: `${percent}%` }}
        />
      </div>
      <div className={styles.progressLabel}>
        {label || (
          <>
            <span className={styles.progressRemaining}>{remaining > 0 ? `Còn ${remaining} chỗ` : 'Hết chỗ'}</span>
            <span className={styles.progressPercent}>{Math.round(percent)}%</span>
          </>
        )}
      </div>
    </div>
  );
}

// ==========================================
// EMPTY STATE
// ==========================================

interface EmptyStateProps {
  icon?: string;
  title: string;
  description?: string;
  action?: React.ReactNode;
}

export function EmptyState({ icon = '🍃', title, description, action }: EmptyStateProps) {
  return (
    <div className={styles.emptyState}>
      <div className={styles.emptyIcon}>{icon}</div>
      <h3 className={styles.emptyTitle}>{title}</h3>
      {description && <p className={styles.emptyDesc}>{description}</p>}
      {action && <div className={styles.emptyAction}>{action}</div>}
    </div>
  );
}

// ==========================================
// STATUS BADGE
// ==========================================

const statusConfig: Record<string, { label: string; variant: string; dot: string }> = {
  pending: { label: 'Chờ xử lý', variant: 'badge-warning', dot: '#eab308' },
  confirmed: { label: 'Đã xác nhận', variant: 'badge-success', dot: '#16a34a' },
  paid: { label: 'Đã thanh toán', variant: 'badge-green', dot: '#047857' },
  completed: { label: 'Hoàn thành', variant: 'badge-green', dot: '#064e3b' },
  cancelled: { label: 'Đã hủy', variant: 'badge-slate', dot: '#94a3b8' },
  open: { label: 'Mở bán', variant: 'badge-success', dot: '#16a34a' },
  full: { label: 'Hết chỗ', variant: 'badge-error', dot: '#dc2626' },
  new: { label: 'Mới', variant: 'badge-amber', dot: '#d97706' },
  contacted: { label: 'Đã liên hệ', variant: 'badge-success', dot: '#16a34a' },
  closed: { label: 'Đã đóng', variant: 'badge-slate', dot: '#94a3b8' },
};

interface StatusBadgeProps {
  status: string;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const config = statusConfig[status] || { label: status, variant: 'badge-slate', dot: '#94a3b8' };
  return (
    <span className={`badge ${config.variant}`}>
      <span style={{ width: 6, height: 6, borderRadius: '50%', background: config.dot, display: 'inline-block' }} />
      {config.label}
    </span>
  );
}

// ==========================================
// LOADING SPINNER
// ==========================================

export function LoadingSpinner({ size = 40 }: { size?: number }) {
  return (
    <div className={styles.loadingWrap}>
      <div
        className={styles.loadingSpinner}
        style={{ width: size, height: size }}
      />
      <p className={styles.loadingText}>Đang tải...</p>
    </div>
  );
}

// ==========================================
// CONFIRM DIALOG
// ==========================================

interface ConfirmDialogProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: 'danger' | 'warning';
  onConfirm: () => void;
  onCancel: () => void;
}

export function ConfirmDialog({
  isOpen,
  title,
  message,
  confirmLabel = 'Xác nhận',
  cancelLabel = 'Hủy',
  variant = 'danger',
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  if (!isOpen) return null;

  return (
    <Modal isOpen={isOpen} onClose={onCancel} title={title} size="sm">
      <p className={styles.confirmMessage}>{message}</p>
      <div className={styles.confirmActions}>
        <Button variant="outline" onClick={onCancel}>
          {cancelLabel}
        </Button>
        <Button variant={variant === 'danger' ? 'danger' : 'primary'} onClick={onConfirm}>
          {confirmLabel}
        </Button>
      </div>
    </Modal>
  );
}
