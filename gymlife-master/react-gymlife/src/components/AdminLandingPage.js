import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Trash2, Search, UserCheck, UserX } from 'lucide-react';
import { useGymData } from '../context/GymDataContext';

const AdminLandingPage = () => {
  const navigate = useNavigate();
  const { members, deleteMember: deleteFromSystem } = useGymData();
  const [searchTerm, setSearchTerm] = useState('');

  const handleDeleteMember = (e, memberId) => {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this member? This will remove all their data from the system.')) {
      deleteFromSystem(memberId);
    }
  };

  const filteredMembers = members.filter(member =>
    member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleMemberClick = (memberId) => {
    navigate(`/admin/members/${memberId}`);
  };

  return (
    <div style={styles.container}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Work+Sans:wght@300;400;600;700&display=swap');
        
        @keyframes slideIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .member-card {
          animation: slideIn 0.4s ease-out backwards;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .member-card:hover {
          transform: translateX(8px);
          box-shadow: -4px 0 0 0 #FF6B35;
        }

        .delete-btn {
          transition: all 0.2s ease;
        }

        .delete-btn:hover {
          transform: scale(1.1) rotate(5deg);
        }

        .search-input {
          transition: all 0.3s ease;
        }

        .search-input:focus {
          transform: scale(1.02);
        }
      `}</style>

      <div style={styles.header}>
        <div>
          <h1 style={styles.title}>MEMBERS DIRECTORY</h1>
          <p style={styles.subtitle}>Total Active: {members.filter(m => m.membership === 'active').length} / {members.length}</p>
        </div>
        
        <div style={styles.searchContainer}>
          <Search style={styles.searchIcon} />
          <input
            type="text"
            placeholder="Search members..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={styles.searchInput}
            className="search-input"
          />
        </div>
      </div>

      <div style={styles.statsBar}>
        <div style={styles.statCard}>
          <UserCheck size={24} color="#4ECDC4" />
          <div>
            <div style={styles.statNumber}>{members.filter(m => m.membership === 'active').length}</div>
            <div style={styles.statLabel}>Active</div>
          </div>
        </div>
        <div style={styles.statCard}>
          <UserX size={24} color="#FF6B6B" />
          <div>
            <div style={styles.statNumber}>{members.filter(m => m.membership === 'inactive').length}</div>
            <div style={styles.statLabel}>Inactive</div>
          </div>
        </div>
      </div>

      <div style={styles.membersList}>
        {filteredMembers.map((member, index) => (
          <div
            key={member.id}
            className="member-card"
            style={{
              ...styles.memberCard,
              animationDelay: `${index * 0.1}s`
            }}
            onClick={() => handleMemberClick(member.id)}
          >
            <div style={styles.memberInfo}>
              <div style={styles.memberId}>{member.id}</div>
              <div style={styles.memberDetails}>
                <div style={styles.memberName}>{member.name}</div>
                <div style={styles.memberMeta}>
                  <span style={styles.planBadge}>{member.plan}</span>
                  <span style={styles.dateBadge}>Joined: {member.joinDate}</span>
                </div>
              </div>
            </div>

            <div style={styles.memberActions}>
              <span style={{
                ...styles.statusBadge,
                ...(member.membership === 'active' ? styles.activeBadge : styles.inactiveBadge)
              }}>
                {member.membership.toUpperCase()}
              </span>
              <button
                onClick={(e) => handleDeleteMember(e, member.id)}
                style={styles.deleteButton}
                className="delete-btn"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        ))}

        {filteredMembers.length === 0 && (
          <div style={styles.emptyState}>
            <p style={styles.emptyText}>No members found matching your search.</p>
          </div>
        )}
      </div>
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
    marginBottom: '40px',
    animation: 'fadeIn 0.6s ease-out',
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
  searchContainer: {
    position: 'relative',
    width: '400px',
  },
  searchIcon: {
    position: 'absolute',
    left: '20px',
    top: '50%',
    transform: 'translateY(-50%)',
    color: '#8892b0',
  },
  searchInput: {
    width: '100%',
    padding: '16px 20px 16px 56px',
    background: 'rgba(255, 255, 255, 0.05)',
    border: '2px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '12px',
    color: '#fff',
    fontSize: '16px',
    outline: 'none',
    boxSizing: 'border-box',
  },
  statsBar: {
    display: 'flex',
    gap: '24px',
    marginBottom: '40px',
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
  membersList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  memberCard: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    background: 'rgba(255, 255, 255, 0.03)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '12px',
    padding: '24px',
    cursor: 'pointer',
  },
  memberInfo: {
    display: 'flex',
    gap: '24px',
    alignItems: 'center',
  },
  memberId: {
    fontFamily: "'Bebas Neue', sans-serif",
    fontSize: '28px',
    color: '#FF6B35',
    minWidth: '80px',
  },
  memberDetails: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  memberName: {
    fontSize: '20px',
    fontWeight: '600',
    color: '#fff',
  },
  memberMeta: {
    display: 'flex',
    gap: '12px',
  },
  planBadge: {
    padding: '4px 12px',
    background: 'rgba(78, 205, 196, 0.2)',
    color: '#4ECDC4',
    borderRadius: '6px',
    fontSize: '13px',
    fontWeight: '600',
  },
  dateBadge: {
    padding: '4px 12px',
    background: 'rgba(255, 255, 255, 0.05)',
    color: '#8892b0',
    borderRadius: '6px',
    fontSize: '13px',
  },
  memberActions: {
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
  },
  statusBadge: {
    padding: '8px 20px',
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
  deleteButton: {
    background: 'rgba(255, 107, 107, 0.1)',
    border: '1px solid rgba(255, 107, 107, 0.3)',
    color: '#FF6B6B',
    padding: '12px',
    borderRadius: '8px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyState: {
    padding: '60px',
    textAlign: 'center',
  },
  emptyText: {
    color: '#8892b0',
    fontSize: '18px',
  },
};

export default AdminLandingPage;
