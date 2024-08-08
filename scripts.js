document.addEventListener('DOMContentLoaded', () => {
    const signUpBtn = document.getElementById('sign-up-btn');
    const signInBtn = document.getElementById('sign-in-btn');
    const signOutBtn = document.getElementById('sign-out-btn');
    const walletBtn = document.getElementById('wallet-btn');
    const signUpPopup = document.getElementById('sign-up');
    const signInPopup = document.getElementById('sign-in');
    const walletPopup = document.getElementById('wallet');
    const signUpForm = document.getElementById('sign-up-form');
    const signInForm = document.getElementById('sign-in-form');
    const walletForm = document.getElementById('wallet-form');
    const joinTournamentBtn = document.getElementById('join-tournament-btn');
    const closeButtons = document.querySelectorAll('.close-btn');
    const walletBalanceElement = document.getElementById('wallet-balance');
    const tournamentFee = 10; // Example tournament fee

    const openPopup = (popupId) => {
        document.getElementById(popupId).style.display = 'block';
    };

    const closePopup = (popupId) => {
        document.getElementById(popupId).style.display = 'none';
    };

    closeButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const popup = e.target.closest('.popup');
            popup.style.display = 'none';
        });
    });

    signUpBtn.addEventListener('click', () => openPopup('sign-up'));
    signInBtn.addEventListener('click', () => openPopup('sign-in'));
    walletBtn.addEventListener('click', () => openPopup('wallet'));

    window.addEventListener('click', (event) => {
        if (event.target.classList.contains('popup')) {
            event.target.style.display = 'none';
        }
    });

    signOutBtn.addEventListener('click', () => {
        localStorage.removeItem('gameId');
        updateAuthState();
    });

    signUpForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const gameId = document.getElementById('game-id-sign-up').value;
        localStorage.setItem('gameId', gameId);
        localStorage.setItem('walletBalance', 0); // Initialize wallet balance
        closePopup('sign-up');
        updateAuthState();
    });

    signInForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const gameId = document.getElementById('game-id-sign-in').value;
        const storedGameId = localStorage.getItem('gameId');
        if (gameId === storedGameId) {
            closePopup('sign-in');
            updateAuthState();
        } else {
            alert('Invalid Game ID');
        }
    });

    walletForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const amount = parseFloat(document.getElementById('amount').value);
        let balance = parseFloat(localStorage.getItem('walletBalance')) || 0;
        balance += amount;
        localStorage.setItem('walletBalance', balance);
        updateWalletBalance();
        closePopup('wallet');
    });

    joinTournamentBtn.addEventListener('click', () => {
        let balance = parseFloat(localStorage.getItem('walletBalance')) || 0;
        if (balance >= tournamentFee) {
            balance -= tournamentFee;
            localStorage.setItem('walletBalance', balance);
            alert('Joined the tournament using your wallet balance.');
            updateWalletBalance();
        } else {
            alert('Insufficient balance to join the tournament.');
        }
    });

    const updateWalletBalance = () => {
        const balance = localStorage.getItem('walletBalance') || 0;
        walletBalanceElement.textContent = balance;
    };

    const updateAuthState = () => {
        const gameId = localStorage.getItem('gameId');
        if (gameId) {
            signUpBtn.style.display = 'none';
            signInBtn.style.display = 'none';
            signOutBtn.style.display = 'inline';
            walletBtn.style.display = 'inline';
            updateWalletBalance();
        } else {
            signUpBtn.style.display = 'inline';
            signInBtn.style.display = 'inline';
            signOutBtn.style.display = 'none';
            walletBtn.style.display = 'none';
        }
    };

    updateAuthState();
});
