const obfuscatePhone = (phone) => {
    if (!phone) return '';

    const firstPart = phone.slice(0, 4);
    const lastPart = phone.slice(-4);
    const obfuscated = `${firstPart}****${lastPart}`;

    return obfuscated;
};

const obfuscateEmail = (email) => {
    const [localPart, domain] = email.split('@');
    const localPartObfuscated = localPart.substring(0, 2) + '****';
    const domainObfuscated = domain.split('.').map(part => part[0] + '****').join('.');
    return `${localPartObfuscated}@${domainObfuscated}`;
};

module.exports = { obfuscatePhone, obfuscateEmail };