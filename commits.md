 Phase 1 — back up the current site                                                                           
                                                                                                               
  On github.com: nothing yet.                                                                                  
                                                                                                               
  Terminal:                                                                                                    
  # Clone existing Pages repo locally                                                                          
  git clone https://github.com/wfauriat/CURRENT_REPO_NAME.git ~/Documents/sandbox/legacy_backup                
                                                                                                               
  On github.com: create a new empty repo. Name it whatever you want (e.g. legacy-pages). Do not tick           
  "initialise this repository" — leave it completely empty.                                                    
                                                                                                               
  Terminal:                                                                                                    
  cd ~/Documents/sandbox/legacy_backup                                                                         
  git remote set-url origin https://github.com/wfauriat/LEGACY_REPO_NAME.git                                   
  git push -u origin main                                                                                      
                                                                                                               
  Backup done. The old repo on GitHub can then be archived or deleted at your pace.                            
                                                                                                               
  ---                                                                                                          
  Phase 2 — push SPprofile to wfauriat.github.io                                                               
                                                                                                               
  On github.com: create a new empty repo. The name must be exactly wfauriat.github.io. Do not initialise it.   
  GitHub Pages will auto-deploy main from a repo with that name.                                               
                                                                                                               
  Terminal (SPprofile has no remote yet, so it's just add + push):                                             
  cd ~/Documents/sandbox/SPprofile                                                                             
  git remote add origin https://github.com/wfauriat/wfauriat.github.io.git                                     
  git push -u origin main                                                                                      
                                                                                                               
  Full history (bc62aeb → 4c8bf41 → 7a76ef7 → 1c8c26a) lands on GitHub, and the site goes live at              
  https://wfauriat.github.io/ automatically.          