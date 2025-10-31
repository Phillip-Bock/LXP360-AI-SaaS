document.addEventListener('DOMContentLoaded', () => {
  const App = {
    state: {
      selectedAsset: null,
      originalAsset: null, // To store state for revert
      isEditMode: false,
      unsavedChanges: false,
      currentPage: 1,
      itemsPerPage: 10,
      mockAssets: [
        { id: 1, name: '3DArtifact-TRD-009_space-shuttle_v1.0.obj', version: '1.0', project: 'Space Flight History', owner: 'Phillip', status: 'Approved', type: '3D Artifact', tags: ['sci-fi', 'nasa', 'vehicle'] },
        { id: 2, name: 'Video-HR-001_ceo-welcome_message_v1.0.mp4', version: '1.0', project: 'Marketing Campaign', owner: 'Jane', status: 'Under Review', type: 'Video', tags: ['corporate', 'speech'] },
        { id: 3, name: 'Image-MKT-001-flower-in-a-field_v0.0.png', version: '0.0', project: 'Nature Series', owner: 'John', status: 'Approved', type: '360° Image', tags: ['nature', 'landscape', 'flower'] },
        { id: 4, name: 'Image-MKT-002_product-shot_v1.3.png', version: '1.3', project: 'Product Launch', owner: 'Phillip', status: 'Requires Revision', type: '2D Image', tags: ['product', 'studio'] },
        { id: 5, name: 'Audio-MKT-001_background-music_v1.0.mp3', version: '1.0', project: 'Marketing Campaign', owner: 'Jane', status: 'Approved', type: 'Audio', tags: ['music', 'upbeat'] },
        { id: 6, name: 'Code-SE-006_ai-e-mentor_v2.2.zip', version: '2.2', project: 'AI Development', owner: 'Phillip', status: 'Approved', type: 'Code Interaction', tags: ['ai', 'mentor', 'codebase'] },
      ],
      filteredAssets: [],
    },

    elements: {
      assetTableBody: document.getElementById('assetTableBody'),
      mediaViewer: document.getElementById('mediaViewer'),
      viewerCaption: document.getElementById('viewerCaption'),
      searchInput: document.getElementById('searchInput'),
      clearSearchBtn: document.getElementById('clearSearchBtn'),
      mediaCategory: document.getElementById('mediaCategory'),
      paginationContainer: document.getElementById('paginationContainer'),
      uploadBtn: document.getElementById('uploadBtn'),
      downloadBtn: document.getElementById('downloadBtn'),
      editBtn: document.getElementById('editBtn'),
      saveBtn: document.getElementById('saveBtn'),
      revertBtn: document.getElementById('revertBtn'),
      refreshBtn: document.getElementById('refreshBtn'),
      checkboxHeader: document.getElementById('checkbox-header'),
    },

    init() {
      this.addEventListeners();
      this.updateButtonStates();
      this.renderTable(); // Will render empty state initially
      this.renderPagination();
    },

    addEventListeners() {
      this.elements.searchInput.addEventListener('input', () => {
        this.filterAndSearch();
        this.elements.clearSearchBtn.classList.toggle('hidden', !this.elements.searchInput.value);
      });

      this.elements.clearSearchBtn.addEventListener('click', () => {
        this.elements.searchInput.value = '';
        this.elements.clearSearchBtn.classList.add('hidden');
        this.filterAndSearch();
      });

      this.elements.mediaCategory.addEventListener('change', () => this.filterAndSearch());

      this.elements.editBtn.addEventListener('click', () => this.toggleEditMode());
      this.elements.saveBtn.addEventListener('click', () => this.handleSave());
      this.elements.revertBtn.addEventListener('click', () => this.handleRevert());
      this.elements.refreshBtn.addEventListener('click', () => this.handleRefresh());

      this.elements.uploadBtn.addEventListener('click', () => console.log('Upload clicked'));
      this.elements.downloadBtn.addEventListener('click', () => console.log('Download clicked'));
    },

    renderTable() {
      this.elements.assetTableBody.innerHTML = '';
      this.elements.checkboxHeader.classList.toggle('hidden', !this.state.isEditMode);

      const paginatedAssets = this.paginate(this.state.filteredAssets, this.state.currentPage, this.state.itemsPerPage);

      if (paginatedAssets.length === 0) {
        const row = document.createElement('tr');
        const message = this.elements.mediaCategory.value === 'None Selected' ? 'Please select a category to view assets.' : 'No assets found.';
        row.innerHTML = `<td colspan="7" class="text-center py-4">${message}</td>`;
        this.elements.assetTableBody.appendChild(row);
        return;
      }

      paginatedAssets.forEach(asset => {
        const row = document.createElement('tr');
        row.className = 'hover:bg-gray-200 cursor-pointer border-b border-table-border';
        const statusInfo = this.getStatusInfo(asset.status);
        let tagsHTML = asset.tags.map(tag => `<span class="bg-[#ffbe0a] text-dark-grey text-xs font-bold mr-2 px-2.5 py-0.5 rounded-xl">${tag}</span>`).join(' ');

        row.innerHTML = `
                    <td class="p-2 ${this.state.isEditMode ? '' : 'hidden'}"><input type="checkbox" class="form-checkbox h-5 w-5 text-primary-blue rounded"></td>
                    <td class="py-3 px-4" ${this.state.isEditMode ? 'contenteditable="true"' : ''}>${asset.name}</td>
                    <td class="py-3 px-4 hidden md:table-cell" ${this.state.isEditMode ? 'contenteditable="true"' : ''}>${asset.version}</td>
                    <td class="py-3 px-4 hidden lg:table-cell" ${this.state.isEditMode ? 'contenteditable="true"' : ''}>${asset.project}</td>
                    <td class="py-3 px-4" ${this.state.isEditMode ? 'contenteditable="true"' : ''}>${asset.owner}</td>
                    <td class="py-3 px-4">${statusInfo.text}</td>
                    <td class="py-3 px-4 hidden lg:table-cell">${tagsHTML}</td>
                `;

        row.addEventListener('click', (e) => {
          if (e.target.type !== 'checkbox' && !this.state.isEditMode) {
            this.selectAsset(asset);
            document.querySelectorAll('#assetTableBody tr').forEach(r => r.classList.remove('bg-blue-200'));
            row.classList.add('bg-blue-200');
          }
        });
        this.elements.assetTableBody.appendChild(row);
      });
    },

    renderPagination() {
      this.elements.paginationContainer.innerHTML = '';
      const totalPages = Math.ceil(this.state.filteredAssets.length / this.state.itemsPerPage);

      // Items per page dropdown
      const itemsPerPageSelect = document.createElement('div');
      itemsPerPageSelect.innerHTML = `
                <label for="itemsPerPage">Items per page: </label>
                <select id="itemsPerPage" class="bg-input-bg rounded-lg p-1">
                    <option value="10">10</option>
                    <option value="20">20</option>
                    <option value="50">50</option>
                </select>
            `;
      itemsPerPageSelect.querySelector('#itemsPerPage').value = this.state.itemsPerPage;
      itemsPerPageSelect.querySelector('#itemsPerPage').addEventListener('change', (e) => {
        this.state.itemsPerPage = parseInt(e.target.value);
        this.state.currentPage = 1;
        this.renderTable();
        this.renderPagination();
      });
      this.elements.paginationContainer.appendChild(itemsPerPageSelect);

      // Page numbers
      if (totalPages > 1) {
        const pageNumbersDiv = document.createElement('div');
        for (let i = 1; i <= totalPages; i++) {
          const pageBtn = document.createElement('button');
          pageBtn.textContent = i;
          pageBtn.className = `page-btn ${i === this.state.currentPage ? 'active' : ''}`;
          pageBtn.addEventListener('click', () => {
            this.state.currentPage = i;
            this.renderTable();
            this.renderPagination();
          });
          pageNumbersDiv.appendChild(pageBtn);
        }
        this.elements.paginationContainer.appendChild(pageNumbersDiv);
      }
    },

    selectAsset(asset) {
      this.state.selectedAsset = asset;
      this.state.originalAsset = JSON.parse(JSON.stringify(asset)); // Deep copy for revert
      this.elements.viewerCaption.textContent = `${asset.name}, Version ${asset.version}`;
      this.elements.mediaViewer.innerHTML = `<div class="text-center text-lg p-4">
                <strong class="block">${asset.type} Preview</strong>
                <p class="text-gray-500">${asset.name}</p>
            </div>`;
      this.updateButtonStates();
    },

    updateButtonStates() {
      const buttons = {
        save: this.elements.saveBtn,
        revert: this.elements.revertBtn,
        refresh: this.elements.refreshBtn,
        upload: this.elements.uploadBtn,
        download: this.elements.downloadBtn,
        edit: this.elements.editBtn,
        filter: document.getElementById('filterBtn'),
      };

      Object.values(buttons).forEach(btn => {
        btn.disabled = false;
        btn.className = 'action-button bg-active-blue';
        btn.style.boxShadow = `2px 2px 6px #70b3ff`;
        btn.classList.add('hover:bg-hover-blue');
      });

      if (this.state.isEditMode) {
        buttons.upload.disabled = true;
        buttons.download.disabled = true;
        buttons.refresh.disabled = true;
        buttons.filter.disabled = true;
        buttons.revert.disabled = !this.state.unsavedChanges;
      } else {
        buttons.save.disabled = true;
        buttons.revert.disabled = true;
      }

      if (!this.state.selectedAsset) {
        buttons.download.disabled = true;
        buttons.edit.disabled = true;
      }

      Object.values(buttons).forEach(btn => {
        if (btn.disabled) {
          btn.className = 'action-button bg-disabled-bg text-disabled-text cursor-not-allowed';
          btn.style.boxShadow = `2px 2px 6px #FFFFFF`;
        }
      });

      if (!buttons.revert.disabled) {
        buttons.revert.className = 'action-button bg-warning-red hover:bg-revert-hover';
      }
    },

    filterAndSearch() {
      const searchTerm = this.elements.searchInput.value.toLowerCase();
      const category = this.elements.mediaCategory.value;

      if (category === 'None Selected') {
        this.state.filteredAssets = [];
      } else {
        this.state.filteredAssets = this.state.mockAssets.filter(asset => {
          const matchesCategory = asset.type === category;
          const matchesSearch = searchTerm === '' || asset.tags.some(tag => tag.toLowerCase().includes(searchTerm));
          return matchesCategory && matchesSearch;
        });
      }

      this.state.currentPage = 1;
      this.renderTable();
      this.renderPagination();
    },

    getStatusInfo(status) {
      switch (status) {
        case 'Approved': return { text: 'Approved', color: 'bg-confirmed-green' };
        case 'Under Review': return { text: 'Under Review', color: 'bg-error-yellow text-black' };
        case 'Requires Revision': return { text: 'Requires Revision', color: 'bg-warning-red' };
        default: return { text: 'Unknown', color: 'bg-dark-grey' };
      }
    },

    handleSave() {
      console.log('Save clicked');
      this.state.isEditMode = false;
      this.state.unsavedChanges = false;
      this.state.selectedAsset = null;
      this.state.originalAsset = null;
      this.updateButtonStates();
      this.renderTable();
    },
    handleRevert() {
      console.log('Revert clicked');
      // This would revert the data in the table to originalAsset
      this.state.isEditMode = false;
      this.state.unsavedChanges = false;
      this.selectAsset(this.state.originalAsset); // Reselect to restore original data view
      this.updateButtonStates();
      this.renderTable();
    },
    handleRefresh() {
      window.location.reload();
    },

    toggleEditMode() {
      this.state.isEditMode = !this.state.isEditMode;
      if (this.state.isEditMode) {
        this.state.unsavedChanges = true; // Entering edit mode implies potential changes
      }
      this.updateButtonStates();
      this.renderTable();
    },

    paginate(items, page, perPage) {
      const start = (page - 1) * perPage;
      const end = start + perPage;
      return items.slice(start, end);
    }
  };

  App.init();
});
