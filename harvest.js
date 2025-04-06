document.addEventListener('DOMContentLoaded', () => {
    const apiUrl = 'http://localhost:3000/api';
    const harvestModal = document.getElementById('harvestModal');
    const harvestForm = document.getElementById('harvestForm');
    const addHarvestBtn = document.getElementById('addHarvestBtn');
    const modalTitle = document.getElementById('modalTitle');
    let editHarvestId = null;

    // Função para carregar safras
    const loadHarvests = async () => {
        const response = await fetch(`${apiUrl}/harvests`);
        const harvests = await response.json();
        const tableBody = document.querySelector('#harvestsTable tbody');
        tableBody.innerHTML = '';

        harvests.forEach(harvest => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${harvest.name}</td>
                <td>${harvest.startDate}</td>
                <td>${harvest.endDate}</td>
                <td>${harvest.plantationId}</td>
                <td>
                    <button class="editHarvestBtn" data-id="${harvest.id}">Editar</button>
                    <button class="deleteHarvestBtn" data-id="${harvest.id}">Deletar</button>
                </td>
            `;
            tableBody.appendChild(row);
        });

        document.querySelectorAll('.editHarvestBtn').forEach(button => {
            button.addEventListener('click', (e) => openEditHarvestModal(e.target.dataset.id));
        });

        document.querySelectorAll('.deleteHarvestBtn').forEach(button => {
            button.addEventListener('click', (e) => deleteHarvest(e.target.dataset.id));
        });
    };

    // Função para adicionar safra
    const addHarvest = async (harvest) => {
        await fetch(`${apiUrl}/harvests`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(harvest),
        });
        loadHarvests();
    };

    // Função para atualizar safra
    const updateHarvest = async (id, harvest) => {
        await fetch(`${apiUrl}/harvests/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(harvest),
        });
        loadHarvests();
    };

    // Função para deletar safra
    const deleteHarvest = async (id) => {
        await fetch(`${apiUrl}/harvests/${id}`, {
            method: 'DELETE',
        });
        loadHarvests();
    };

    // Abrir modal para editar safra
    const openEditHarvestModal = async (id) => {
        editHarvestId = id;
        modalTitle.innerText = 'Editar Safra';

        const response = await fetch(`${apiUrl}/harvests/${id}`);
        const harvest = await response.json();

        document.getElementById('harvestName').value = harvest.name;
        document.getElementById('startDate').value = harvest.startDate;
        document.getElementById('endDate').value = harvest.endDate;
        document.getElementById('plantationId').value = harvest.plantationId;
        harvestModal.style.display = 'block';
    };

    // Abrir modal para adicionar nova safra
    const openAddHarvestModal = () => {
        editHarvestId = null;
        modalTitle.innerText = 'Adicionar Safra';
        harvestForm.reset();
        harvestModal.style.display = 'block';
    };

    // Fechar modal ao clicar no "x"
    document.querySelector('.close').addEventListener('click', () => {
        harvestModal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target === harvestModal) {
            harvestModal.style.display = 'none';
        }
    });

    // Submissão do formulário
    harvestForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const harvestData = {
            name: document.getElementById('harvestName').value,
            startDate: document.getElementById('startDate').value,
            endDate: document.getElementById('endDate').value,
            plantationId: document.getElementById('plantationId').value,
        };

        if (editHarvestId) {
            await updateHarvest(editHarvestId, harvestData);
        } else {
            await addHarvest(harvestData);
        }

        harvestModal.style.display = 'none';
        loadHarvests();
    });

    addHarvestBtn.addEventListener('click', openAddHarvestModal);
    loadHarvests();
});