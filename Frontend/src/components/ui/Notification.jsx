import React, { useEffect } from 'react';
import { CheckCircle, XCircle, AlertCircle, X, User } from 'lucide-react';

const Notification = ({ notification, onClose }) => {
    useEffect(() => {
        if (notification.autoClose) {
            const timer = setTimeout(() => {
                onClose();
            }, 5000);

            return () => clearTimeout(timer);
        }
    }, [notification, onClose]);

    if (!notification.show) return null;

    const getNotificationStyles = (type) => {
        const baseStyles = "max-w-md w-full bg-white rounded-2xl shadow-2xl border-l-4 overflow-hidden transform transition-all duration-300 ease-in-out";

        switch (type) {
            case 'success':
                return `${baseStyles} border-green-500`;
            case 'error':
                return `${baseStyles} border-red-500`;
            case 'warning':
                return `${baseStyles} border-yellow-500`;
            case 'info':
                return `${baseStyles} border-blue-500`;
            default:
                return `${baseStyles} border-gray-500`;
        }
    };

    const getIcon = (type) => {
        const iconClass = "w-6 h-6";
        switch (type) {
            case 'success':
                return <CheckCircle className={`${iconClass} text-green-500`} />;
            case 'error':
                return <XCircle className={`${iconClass} text-red-500`} />;
            case 'warning':
                return <AlertCircle className={`${iconClass} text-yellow-500`} />;
            default:
                return <User className={`${iconClass} text-blue-500`} />;
        }
    };

    const getBackgroundColor = (type) => {
        switch (type) {
            case 'success':
                return 'bg-green-50';
            case 'error':
                return 'bg-red-50';
            case 'warning':
                return 'bg-yellow-50';
            default:
                return 'bg-blue-50';
        }
    };

    return (
        <div className="fixed top-6 right-6 z-50 animate-slide-in-right">
            <div className={getNotificationStyles(notification.type)}>
                <div className="flex">
                    {/* Icon Section */}
                    <div className={`flex items-center justify-center px-4 py-6 ${getBackgroundColor(notification.type)}`}>
                        {getIcon(notification.type)}
                    </div>

                    {/* Content Section */}
                    <div className="flex-1 px-4 py-6">
                        <div className="flex items-start justify-between">
                            <div className="flex-1">
                                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                                    {notification.title}
                                </h3>
                                {notification.message && (
                                    <p className="text-gray-600 text-sm leading-relaxed">
                                        {notification.message}
                                    </p>
                                )}
                                {notification.details && (
                                    <div className="mt-2 p-3 bg-gray-50 rounded-lg">
                                        <p className="text-xs text-gray-700 font-medium">Registration Details:</p>
                                        <p className="text-xs text-gray-600 mt-1">{notification.details}</p>
                                    </div>
                                )}
                            </div>

                            <button
                                onClick={onClose}
                                className="ml-4 flex-shrink-0 rounded-lg p-1 hover:bg-gray-100 transition-colors duration-200"
                            >
                                <X className="w-4 h-4 text-gray-400" />
                            </button>
                        </div>

                        {/* Progress Bar */}
                        {notification.autoClose && (
                            <div className="mt-4 w-full bg-gray-200 rounded-full h-1">
                                <div
                                    className="h-1 rounded-full bg-green-500 transition-all duration-5000 ease-linear"
                                    style={{
                                        width: '100%',
                                        animation: 'shrink 5s linear forwards'
                                    }}
                                />
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <style jsx>{`
        @keyframes slide-in-right {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        @keyframes shrink {
          from { width: 100%; }
          to { width: 0%; }
        }
        .animate-slide-in-right {
          animation: slide-in-right 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        }
      `}</style>
        </div>
    );
};

export default Notification;