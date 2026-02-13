import React, { useState } from 'react';
import { Mail, Phone, Instagram, Facebook, Award, UserCheck, UserX, X } from 'lucide-react';
import { useGymData } from '../context/GymDataContext';

const AdminTrainersPage = () => {
  const { trainers } = useGymData();

  const [selectedTrainer, setSelectedTrainer] = useState(null);

  return (
    <div style={styles.container}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Work+Sans:wght@300;400;600;700&display=swap');
        
        @keyframes slideIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes modalSlideIn {
          from { opacity: 0; transform: translateX(100%); }
          to { opacity: 1; transform: translateX(0); }
        }

        .trainer-card {
          animation: slideIn 0.4s ease-out backwards;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .trainer-card:hover {
          transform: translateY(-12px);
          box-shadow: 0 24px 48px rgba(255, 107, 53, 0.2);
        }

        .trainer-card:hover .trainer-image {
          transform: scale(1.1);
        }

        .trainer-image {
          transition: transform 0.5s ease;
        }

        .detail-modal {
          animation: modalSlideIn 0.4s ease-out;
        }
      `}</style>

      <div style={styles.header}>
        <div>
          <h1 style={styles.title}>TRAINING TEAM</h1>
          <p style={styles.subtitle}>
            Active Trainers: {trainers.filter(t => t.status === 'active').length} / {trainers.length}
          </p>
        </div>

        <div style={styles.statsBar}>
          <div style={styles.statCard}>
            <UserCheck size={24} color="#4ECDC4" />
            <div>
              <div style={styles.statNumber}>{trainers.filter(t => t.status === 'active').length}</div>
              <div style={styles.statLabel}>Active</div>
            </div>
          </div>
          <div style={styles.statCard}>
            <UserX size={24} color="#FF6B6B" />
            <div>
              <div style={styles.statNumber}>{trainers.filter(t => t.status === 'inactive').length}</div>
              <div style={styles.statLabel}>Inactive</div>
            </div>
          </div>
        </div>
      </div>

      <div style={styles.trainersGrid}>
        {trainers.map((trainer, index) => (
          <div
            key={trainer.id}
            className="trainer-card"
            style={{
              ...styles.trainerCard,
              animationDelay: `${index * 0.1}s`
            }}
            onClick={() => setSelectedTrainer(trainer)}
          >
            <div style={styles.imageWrapper}>
              <img
                src={trainer.image}
                alt={trainer.name}
                style={styles.trainerImage}
                className="trainer-image"
              />
              <div style={styles.imageOverlay}>
                <span style={{
                  ...styles.statusBadge,
                  ...(trainer.status === 'active' ? styles.activeBadge : styles.inactiveBadge)
                }}>
                  {trainer.status.toUpperCase()}
                </span>
              </div>
            </div>

            <div style={styles.trainerContent}>
              <div style={styles.trainerId}>{trainer.id}</div>
              <h3 style={styles.trainerName}>{trainer.name}</h3>
              <div style={styles.specialtyBadge}>{trainer.specialty}</div>

              <div style={styles.trainerMeta}>
                <div style={styles.metaItem}>
                  <Award size={16} color="#4ECDC4" />
                  <span>{trainer.experience}</span>
                </div>
              </div>

              <button style={styles.viewButton}>View Details →</button>
            </div>
          </div>
        ))}
      </div>

      {selectedTrainer && (
        <div style={styles.modalOverlay} onClick={() => setSelectedTrainer(null)}>
          <div
            className="detail-modal"
            style={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <button style={styles.closeButton} onClick={() => setSelectedTrainer(null)}>
              <X size={24} />
            </button>

            <div style={styles.modalHeader}>
              <img
                src={selectedTrainer.image}
                alt={selectedTrainer.name}
                style={styles.modalImage}
              />
              <div style={styles.modalHeaderInfo}>
                <div style={styles.modalId}>{selectedTrainer.id}</div>
                <h2 style={styles.modalName}>{selectedTrainer.name}</h2>
                <div style={styles.modalSpecialty}>{selectedTrainer.specialty}</div>
                <span style={{
                  ...styles.modalStatus,
                  ...(selectedTrainer.status === 'active' ? styles.activeBadge : styles.inactiveBadge)
                }}>
                  {selectedTrainer.status.toUpperCase()}
                </span>
              </div>
            </div>

            <div style={styles.modalBody}>
              <div style={styles.detailSection}>
                <h3 style={styles.detailSectionTitle}>Experience</h3>
                <div style={styles.detailCard}>
                  <Award size={24} color="#FF6B35" />
                  <div>
                    <div style={styles.detailLabel}>Years in Industry</div>
                    <div style={styles.detailValue}>{selectedTrainer.experience}</div>
                  </div>
                </div>
              </div>

              <div style={styles.detailSection}>
                <h3 style={styles.detailSectionTitle}>Contact Information</h3>

                <div style={styles.contactList}>
                  <div style={styles.contactItem}>
                    <Mail size={20} color="#4ECDC4" />
                    <div>
                      <div style={styles.contactLabel}>Email</div>
                      <div style={styles.contactValue}>{selectedTrainer.email}</div>
                    </div>
                  </div>

                  <div style={styles.contactItem}>
                    <Phone size={20} color="#4ECDC4" />
                    <div>
                      <div style={styles.contactLabel}>Phone</div>
                      <div style={styles.contactValue}>{selectedTrainer.phone}</div>
                    </div>
                  </div>
                </div>
              </div>

              <div style={styles.detailSection}>
                <h3 style={styles.detailSectionTitle}>Social Media</h3>

                <div style={styles.socialGrid}>
                  <a
                    href={`https://instagram.com/${selectedTrainer.instagram.replace('@', '')}`}
                    style={styles.socialCard}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Instagram size={32} color="#E4405F" />
                    <div>
                      <div style={styles.socialLabel}>Instagram</div>
                      <div style={styles.socialHandle}>{selectedTrainer.instagram}</div>
                    </div>
                  </a>

                  <a
                    href={`https://facebook.com/${selectedTrainer.facebook}`}
                    style={styles.socialCard}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Facebook size={32} color="#1877F2" />
                    <div>
                      <div style={styles.socialLabel}>Facebook</div>
                      <div style={styles.socialHandle}>{selectedTrainer.facebook}</div>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    padding: '40px',
    fontFamily: "'Work Sans', sans-serif",
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '48px',
  },
  title: {
    fontFamily: "'Bebas Neue', sans-serif",
    fontSize: '56px',
    color: '#fff',
    margin: '0',
    letterSpacing: '4px',
    textShadow: '2px 2px 20px rgba(255, 107, 53, 0.3)',
  },
  subtitle: {
    color: '#8892b0',
    fontSize: '18px',
    marginTop: '8px',
  },
  statsBar: {
    display: 'flex',
    gap: '24px',
  },
  statCard: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    background: 'rgba(255, 255, 255, 0.05)',
    padding: '20px 32px',
    borderRadius: '12px',
    border: '1px solid rgba(255, 255, 255, 0.1)',
  },
  statNumber: {
    fontSize: '32px',
    fontWeight: '700',
    color: '#fff',
  },
  statLabel: {
    fontSize: '14px',
    color: '#8892b0',
    textTransform: 'uppercase',
    letterSpacing: '1px',
  },
  trainersGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
    gap: '32px',
  },
  trainerCard: {
    background: 'rgba(255, 255, 255, 0.03)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '16px',
    overflow: 'hidden',
    cursor: 'pointer',
  },
  imageWrapper: {
    position: 'relative',
    height: '280px',
    overflow: 'hidden',
  },
  trainerImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  imageOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(to bottom, transparent 50%, rgba(10, 14, 39, 0.9) 100%)',
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
    padding: '20px',
  },
  statusBadge: {
    padding: '8px 16px',
    borderRadius: '8px',
    fontSize: '12px',
    fontWeight: '700',
    letterSpacing: '1px',
  },
  activeBadge: {
    background: 'rgba(78, 205, 196, 0.2)',
    color: '#4ECDC4',
    border: '1px solid #4ECDC4',
  },
  inactiveBadge: {
    background: 'rgba(255, 107, 107, 0.2)',
    color: '#FF6B6B',
    border: '1px solid #FF6B6B',
  },
  trainerContent: {
    padding: '24px',
  },
  trainerId: {
    fontFamily: "'Bebas Neue', sans-serif",
    fontSize: '20px',
    color: '#FF6B35',
    marginBottom: '8px',
  },
  trainerName: {
    fontFamily: "'Bebas Neue', sans-serif",
    fontSize: '28px',
    color: '#fff',
    margin: '0 0 12px 0',
    letterSpacing: '1px',
  },
  specialtyBadge: {
    display: 'inline-block',
    padding: '6px 12px',
    background: 'rgba(78, 205, 196, 0.2)',
    color: '#4ECDC4',
    borderRadius: '6px',
    fontSize: '13px',
    fontWeight: '600',
    marginBottom: '16px',
  },
  trainerMeta: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    marginBottom: '20px',
  },
  metaItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    color: '#8892b0',
    fontSize: '14px',
  },
  viewButton: {
    width: '100%',
    padding: '14px',
    background: 'rgba(255, 107, 53, 0.1)',
    border: '1px solid rgba(255, 107, 53, 0.3)',
    borderRadius: '8px',
    color: '#FF6B35',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
  },
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(0, 0, 0, 0.8)',
    backdropFilter: 'blur(8px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    zIndex: 1000,
  },
  modalContent: {
    background: '#1a1f3a',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderLeft: '4px solid #FF6B35',
    width: '90%',
    maxWidth: '600px',
    height: '100vh',
    overflowY: 'auto',
    position: 'relative',
  },
  closeButton: {
    position: 'absolute',
    top: '32px',
    right: '32px',
    background: 'rgba(255, 255, 255, 0.05)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    color: '#8892b0',
    width: '48px',
    height: '48px',
    borderRadius: '12px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  modalHeader: {
    display: 'flex',
    gap: '24px',
    padding: '40px',
    borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
  },
  modalImage: {
    width: '140px',
    height: '140px',
    borderRadius: '16px',
    objectFit: 'cover',
    border: '2px solid rgba(255, 107, 53, 0.3)',
  },
  modalHeaderInfo: {
    flex: 1,
  },
  modalId: {
    fontFamily: "'Bebas Neue', sans-serif",
    fontSize: '20px',
    color: '#FF6B35',
    marginBottom: '8px',
  },
  modalName: {
    fontFamily: "'Bebas Neue', sans-serif",
    fontSize: '36px',
    color: '#fff',
    margin: '0 0 12px 0',
    letterSpacing: '2px',
  },
  modalSpecialty: {
    color: '#4ECDC4',
    fontSize: '16px',
    fontWeight: '600',
    marginBottom: '16px',
  },
  modalStatus: {
    display: 'inline-block',
    padding: '8px 16px',
    borderRadius: '8px',
    fontSize: '12px',
    fontWeight: '700',
    letterSpacing: '1px',
  },
  modalBody: {
    padding: '40px',
  },
  detailSection: {
    marginBottom: '40px',
  },
  detailSectionTitle: {
    fontFamily: "'Bebas Neue', sans-serif",
    fontSize: '24px',
    color: '#fff',
    letterSpacing: '2px',
    marginBottom: '20px',
  },
  detailCard: {
    display: 'flex',
    gap: '16px',
    padding: '24px',
    background: 'rgba(255, 255, 255, 0.03)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '12px',
    alignItems: 'center',
  },
  detailLabel: {
    fontSize: '12px',
    color: '#8892b0',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    marginBottom: '4px',
  },
  detailValue: {
    fontSize: '20px',
    color: '#fff',
    fontWeight: '600',
  },
  contactList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  contactItem: {
    display: 'flex',
    gap: '16px',
    padding: '20px',
    background: 'rgba(255, 255, 255, 0.03)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '12px',
    alignItems: 'center',
  },
  contactLabel: {
    fontSize: '12px',
    color: '#8892b0',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    marginBottom: '4px',
  },
  contactValue: {
    fontSize: '16px',
    color: '#fff',
    fontWeight: '600',
  },
  socialGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '16px',
  },
  socialCard: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '12px',
    padding: '24px',
    background: 'rgba(255, 255, 255, 0.03)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '12px',
    textDecoration: 'none',
    textAlign: 'center',
  },
  socialLabel: {
    fontSize: '12px',
    color: '#8892b0',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    marginBottom: '4px',
  },
  socialHandle: {
    fontSize: '14px',
    color: '#fff',
    fontWeight: '600',
  },
};

export default AdminTrainersPage;
