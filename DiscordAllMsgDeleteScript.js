(async () => {
    // Ожидание
    const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    // Функция для получения всех сообщений текущего пользователя
    const getUserMessages = () => {
        const userName = "Vlastelin"; // Замените на ваше имя пользователя
        let isNamePrevExist = false;

        const allMessages = document.querySelectorAll('div[role="article"]');
        return Array.from(allMessages).filter(message => {
            const msgHolderText = message.querySelector('h3')?.innerText;

            const isNameExist =
                msgHolderText && msgHolderText.indexOf(userName) !== -1;

            if (!isNameExist && msgHolderText === undefined) {
                return isNamePrevExist;
            }

            isNamePrevExist = isNameExist;
            return isNameExist;
        });
    };

    // Функция для удаления сообщения
    const deleteMessage = async (messageElement) => {
        try {
            // Нажимаем на "Ещё"
            const moreButton = messageElement.querySelector('div[aria-label="Ещё"]');
            if (moreButton) {
                moreButton.click();
                await sleep(500); // Пауза для открытия меню
            }

            // Нажимаем "Удалить сообщение"
            const deleteButton = document.querySelector('div[role="menuitem"][id="message-actions-delete"]');
            if (deleteButton) {
                deleteButton.click();
                await sleep(500); // Пауза для подтверждения
            }

            // Подтверждаем удаление
            const confirmButton = document.querySelector('button[type="submit"]');
            if (confirmButton) {
                confirmButton.click();
                await sleep(1000); // Пауза между удалениями
            }
        } catch (e) {
            console.error("Ошибка при удалении сообщения:", e);
        }
    };

    // Основной процесс
    const userMessages = getUserMessages();
    console.log(`Найдено ${userMessages.length} сообщений.`);

    for (const message of userMessages) {
        await deleteMessage(message); // Используем await для последовательного удаления
    }

    console.log("Все ваши сообщения удалены!");
})();
